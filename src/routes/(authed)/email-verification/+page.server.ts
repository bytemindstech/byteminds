import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import * as UserService from "$lib/server/user.service";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import {
  generateEmailVerificationCode,
  validateVerificationCode,
  sendVerificationCode,
} from "$lib/util.sever";

export const load: PageServerLoad = async ({ url, locals }) => {
  if (!locals.user) {
    throw redirect(302, `/login?redirectTo=${url.pathname}`);
  }
  const verifyEmailForm = await superValidate(
    zod(ZodValidationSchema.verifyEmailSchema),
  );
  const resendCodeForm = await superValidate(
    zod(ZodValidationSchema.resendSchema),
  );

  return {
    verifyEmailForm,
    resendCodeForm,
    emailVerified: locals.user.email_verified,
  };
};

export const actions: Actions = {
  verifyEmail: async ({ request, locals, cookies, url }) => {
    const { user } = await lucia.validateSession(locals.session?.id as string);
    if (!user) {
      return fail(401, { error: "Unauthorized" });
    }
    console.log("User: %s", user);

    const verifyEmailForm = await superValidate(
      request,
      zod(ZodValidationSchema.verifyEmailSchema),
    );

    console.log(verifyEmailForm.data.code);

    if (!verifyEmailForm.data.code) {
      return message(verifyEmailForm, "No code");
    }

    const isValid = await validateVerificationCode(
      user,
      verifyEmailForm.data.code,
    );

    if (!isValid) {
      return message(verifyEmailForm, "Invalid code");
    }
    console.log("Is code Valid: %o", isValid);

    await lucia.invalidateUserSessions(user.id);
    await UserService.updateUserEmailVerified(
      { email_verified: true },
      user.id,
    );
    console.log("Code updated to user table");

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    const redirectTo = url.searchParams.get("redirectTo");
    if (redirectTo !== null) {
      throw redirect(302, `${redirectTo.slice(1)}`);
    }
    redirect(302, "/user");
  },

  resendVerificationCode: async ({ request, locals, cookies }) => {
    const { user } = await lucia.validateSession(locals.session?.id as string);
    if (!user) {
      return fail(401, { error: "Unauthorized" });
    }

    const resendCodeForm = await superValidate(
      request,
      zod(ZodValidationSchema.resendSchema),
    );

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

    return message(
      resendCodeForm,
      "Verification code succesfully sent, please check your email",
    );
  },
};
