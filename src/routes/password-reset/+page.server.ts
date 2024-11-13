import { isSameAsOldPassword, ResetPasswordToken } from "$lib/util.sever";
import { message, superValidate } from "sveltekit-superforms/server";
import { lucia } from "$lib/server/auth";
import { error, redirect } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { Argon2id } from "oslo/password";
import { route } from "$lib/ROUTES";
import { createAndSetSession } from "@jhenbert/byteminds-util";
import type { Actions, PageServerLoad } from "./$types";
import * as ZodValidationSchema from "$lib/server/validations/zodSchemas";
import * as PasswordService from "$lib/server/services/password.service";

export const load = (async ({ url }) => {
  const passwordResetFormData = await superValidate(
    zod(ZodValidationSchema.resetPasswordTokenSchema),
  );

  const passwordResetToken = url.searchParams.get("token");

  if (!passwordResetToken) {
    return error(400, "Password reset token is missing from the request.");
  }

  const resetPasswordToken = new ResetPasswordToken();

  const { valid, message } =
    await resetPasswordToken.validate(passwordResetToken);

  return {
    passwordResetTokenStatus: { isValid: valid, message },
    passwordResetFormData,
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const passwordResetFormData = await superValidate(
      request,
      zod(ZodValidationSchema.resetPasswordTokenSchema),
    );

    if (!passwordResetFormData.valid) {
      return message(passwordResetFormData, "Invalid form", {
        status: 406,
      });
    }

    //Password confirmation
    if (
      passwordResetFormData.data.password !==
      passwordResetFormData.data.confirmPassword
    ) {
      return message(passwordResetFormData, "Passwords do not match", {
        status: 406,
      });
    }

    const resetToken = passwordResetFormData.data.resetPasswordToken;

    if (!resetToken) {
      return message(
        passwordResetFormData,
        "Password reset token is missing from request",
        {
          status: 406,
        },
      );
    }

    const resetPasswordToken = new ResetPasswordToken();

    const validateTokenResponse = await resetPasswordToken.validate(resetToken);

    if (!validateTokenResponse.valid) {
      return message(passwordResetFormData, validateTokenResponse.message, {
        status: 406,
      });
    }

    // userId is guaranteed to exist here since validateTokenResponse.valid is true
    const userId = validateTokenResponse.userId;

    const isSamePassword = await isSameAsOldPassword(
      userId,
      passwordResetFormData.data.password,
    );

    if (isSamePassword) {
      return message(
        passwordResetFormData,
        "New password cannot be same as old password",
        { status: 406 },
      );
    }

    const hashedPassword = await new Argon2id().hash(
      passwordResetFormData.data.password,
    );

    // Invalidate all user sessions before updating the password
    await lucia.invalidateSession(userId);

    //Database transaction delete password reset token and update password
    await PasswordService.databasePasswordTransaction(userId, hashedPassword);

    await createAndSetSession(lucia, userId, cookies);

    redirect(302, route("/signin-signup") + "?register");
  },
};
