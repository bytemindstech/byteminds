import { isSameAsOldPassword, verifyPasswordResetToken } from "$lib/util.sever";
import { message, superValidate } from "sveltekit-superforms/server";
import { lucia } from "$lib/server/auth";
import { error, redirect } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { Argon2id } from "oslo/password";
import { route } from "$lib/ROUTES";
import { createAndSetSession } from "@jhenbert/byteminds-util";
import type { Actions, PageServerLoad } from "./$types";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import * as PasswordService from "$lib/server/password.service";

export const load = (async ({ url }) => {
  const passwordResetFormData = await superValidate(
    zod(ZodValidationSchema.resetPasswordTokenSchema),
  );

  const passwordResetToken = url.searchParams.get("token");

  if (!passwordResetToken) {
    return error(400, "Password reset token is missing from the request.");
  }

  const { valid, message } = await verifyPasswordResetToken(passwordResetToken);

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
      return message(passwordResetFormData, "Form submission failed", {
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

    const passwordResetToken = passwordResetFormData.data.resetPasswordToken;

    if (!passwordResetToken) {
      return message(
        passwordResetFormData,
        "Password reset token is missing from request",
        {
          status: 406,
        },
      );
    }

    const verifyPasswordResetTokenResponse =
      await verifyPasswordResetToken(passwordResetToken);

    if (!verifyPasswordResetTokenResponse.valid) {
      return message(
        passwordResetFormData,
        verifyPasswordResetTokenResponse.message,
        {
          status: 406,
        },
      );
    }

    const userId = verifyPasswordResetTokenResponse.userId;

    if (userId) {
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
    }

    redirect(302, route("/signin-signup") + "?register");
  },
};
