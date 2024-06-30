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
import { route } from "$lib/ROUTES";

export const load = (async ({ parent, locals }) => {
  await parent();

  const user = await UserService.getUserById(locals.user?.id as string);

  if (user?.emailVerified?.isEmailVerified) {
    switch (true) {
      case user.role?.isAdmin:
        throw redirect(302, route("/admin"));

      case user.role?.isParent:
        throw redirect(302, route("/parent"));

      case user.role?.isStudent:
        throw redirect(302, route("/student"));
    }

    redirect(302, route("/user-profile"));
  }
  console.log(user);
  return {
    user,
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  verifyEmail: async ({ request, locals, cookies, url }) => {
    const { user } = await lucia.validateSession(locals.session?.id as string);

    if (!user) {
      return fail(401, { error: "Unauthorized" });
    }

    const verifyEmailForm = await superValidate(
      request,
      zod(ZodValidationSchema.verifyEmailSchema),
    );

    console.log(verifyEmailForm);

    if (!verifyEmailForm.valid) {
      return message(verifyEmailForm, "Invalid form", { status: 406 });
    }

    if (!verifyEmailForm.data.code) {
      return message(verifyEmailForm, "No code");
    }

    const codeStatus = await validateVerificationCode(
      user,
      verifyEmailForm.data.code.toUpperCase(),
    );

    if (!codeStatus.valid) {
      return message(verifyEmailForm, codeStatus.message);
    }

    console.log(codeStatus.message);

    await lucia.invalidateUserSessions(user.id);
    await UserService.updateUserEmailVerified(
      { isEmailVerified: true },
      user.id,
    );

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

    redirect(302, route("/user-profile"));
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
