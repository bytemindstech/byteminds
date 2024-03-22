import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import {
  generateEmailVerificationCode,
  isValid,
  sendVerificationCode,
} from "$lib/util";
import * as UserService from "$lib/server/user.service";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const formData = Object.fromEntries(await request.formData());
    const { username, email, firstName, lastName, password } = formData as {
      [key: string]: string;
    };

    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    if (!isValid(username, password)) {
      return fail(400, { message: "Invalid username or password" });
    }

    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password);

    await UserService.createUser({
      id: userId,
      username,
      email,
      firstName,
      lastName,
      hashed_password: hashedPassword,
      email_verified: false,
    });

    const verificationCode = await generateEmailVerificationCode(userId, email);
    console.log(`Verification Code: ${verificationCode}`);

    await sendVerificationCode(email, verificationCode);

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    redirect(302, "/");
  },
};
