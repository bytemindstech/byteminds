import { lucia } from "$lib/server/auth";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import {
  generateEmailVerificationCode,
  sendVerificationCode,
} from "$lib/util.sever";
import { message, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import * as UserService from "$lib/server/user.service";
import * as RoleService from "$lib/server/role.service";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(ZodValidationSchema.registerSchema));
  return { form };
};

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const form = await superValidate(
      request,
      zod(ZodValidationSchema.registerSchema),
    );

    if (!form.valid) {
      return message(form, "Invalid form", { status: 406 });
    }

    //get all users
    const users = await UserService.getAllUsers();

    //check if user exists
    if (users.some((user) => user.username === form.data.username)) {
      return message(form, "Username already exists", { status: 406 });
    }

    //check if email exists
    if (users.some((user) => user.email === form.data.email)) {
      return message(form, "Email already exists", { status: 406 });
    }

    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(form.data.password);

    await UserService.createUser({
      id: userId,
      username: form.data.username,
      email: form.data.email,
      firstName: form.data.firstName,
      lastName: form.data.lastName,
      hashed_password: hashedPassword,
      email_verified: false,
    });

    //will be dynamically input from event listener
    // await RoleService.createRole({
    //   userId: userId,
    //   isStudent: false,
    //   isParent: false,
    //   isTutor: false,
    //   isAdmin: false,
    // });

    const verificationCode = await generateEmailVerificationCode(
      userId,
      form.data.email,
    );
    await sendVerificationCode(form.data.email, verificationCode);

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    return message(form, "Registered successfully");
  },
};
