import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import {
  generateEmailVerificationCode,
  validateVerificationCode,
  sendVerificationCode,
} from "$lib/util";
import type { Actions } from "./$types";
import * as EmailService from "$lib/server/email.service";

export const actions: Actions = {
  verifyEmail: async ({ request, locals, cookies }) => {
    const { user } = await lucia.validateSession(locals.session?.id as string);
    if (!user) {
      return fail(401, { error: "Unauthorized" });
    }
    console.log("User: %s", user);
    const formData = await request.formData();
    const code = formData.get("code") as string;
    console.log(code);

    if (!code) {
      return fail(401, { error: "Missing code" });
    }

    const isValid = await validateVerificationCode(user, code);

    if (!isValid) {
      return fail(401, { error: "Invalid code" });
    }
    console.log("Is code Valid: %o", isValid);

    await lucia.invalidateUserSessions(user.id);
    await EmailService.updateEmailVerified({ email_verified: true }, user.id);
    console.log("Code updated to user table");

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
    redirect(302, "/user");
  },

  resendVerificationCode: async ({ locals, cookies }) => {
    const { user } = await lucia.validateSession(locals.session?.id as string);
    if (!user) {
      return fail(401, { error: "Unauthorized" });
    }

    const verificationCode = await generateEmailVerificationCode(
      user.id,
      user.email,
    );
    console.log("Verification Code: %o", verificationCode);
    await lucia.invalidateUserSessions(user.id);
    await sendVerificationCode(user.email, verificationCode);
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    redirect(302, "/");
  },
};
