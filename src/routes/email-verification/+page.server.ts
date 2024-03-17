import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { validateVerificationCode } from "$lib/util";
import type { Actions } from "./$types";
import * as UserService from "$lib/server/user.service";

export const actions: Actions = {
  default: async ({ request, locals, cookies }) => {
    const { user } = await lucia.validateSession(locals.session?.id as string);
    if (!user) {
      return fail(401, { error: "Unauthorized" });
    }
    console.log("User: %s", user);
    const formData = Object.fromEntries(await request.formData());
    const { code } = formData as { [key: string]: string | undefined };

    if (!code) {
      return fail(401, { error: "Missing code" });
    }
    console.log(code);

    const isValid = await validateVerificationCode(user, code);

    if (!isValid) {
      return fail(401, { error: "Invalid code" });
    }
    console.log("Is code Valid: %o", isValid);

    await lucia.invalidateUserSessions(user.id);
    await UserService.updateEmailVerified({ email_verified: true }, user.id);
    console.log("Code updated to user table");

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
    redirect(302, "/user");
  },
};
