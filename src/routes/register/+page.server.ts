import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import * as UserService from "$lib/server/user.service";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const formData = Object.fromEntries(await request.formData());
    const { username, email, firstName, lastName, password } = formData as {
      [key: string]: string;
    };

    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    if (
      typeof username !== "string" ||
      username.length < 3 ||
      username.length > 31 ||
      !/^[a-z0-9_-]+$/.test(username)
    ) {
      return fail(400, { message: "Invalid username" });
    }

    if (
      typeof password !== "string" ||
      password.length < 6 ||
      password.length > 255
    ) {
      return fail(400, { message: "Invalid password" });
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
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    redirect(302, "/");
  },
};
