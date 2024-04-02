import { lucia } from "$lib/server/auth";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { generateEmailVerificationCode, sendVerificationCode } from "$lib/util";
import { message, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";
import * as UserService from "$lib/server/user.service";
import * as ZodValidationSchema from "$lib/validations/zodSchema";

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

    console.log(form);
    if (!form.valid) {
      return message(form, "Invalid form");
    }

    //get all users
    const users = await UserService.getAllUsers();

    //check if user exists
    if (users.some((user) => user.username === form.data.username)) {
      return message(form, "Username already taken");
    }

    //check if email exists
    if (users.some((user) => user.email === form.data.email)) {
      return message(form, "Email already exists");
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

    const verificationCode = await generateEmailVerificationCode(
      userId,
      form.data.email,
    );
    console.log(`Verification Code: ${verificationCode}`);

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
