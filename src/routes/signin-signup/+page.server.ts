import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/server/auth";
import { route } from "$lib/ROUTES";
import { generateId } from "lucia";
import { createAndSetSession } from "@jhenbert/byteminds-util";
import { match } from "ts-pattern";
import {
  createPasswordResetToken,
  generateEmailVerificationCode,
  sendResetPasswordToken,
  sendVerificationCode,
} from "$lib/util.sever";
import * as UserService from "$lib/server/user.service";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";

export const load = (async () => {
  const loginForm = await superValidate(zod(ZodValidationSchema.loginSchema));

  const registrationForm = await superValidate(
    zod(ZodValidationSchema.registerSchema),
  );

  const resetPasswordForm = await superValidate(
    zod(ZodValidationSchema.resetPasswordEmailSchema),
  );

  return { loginForm, registrationForm, resetPasswordForm };
}) satisfies PageServerLoad;

export const actions: Actions = {
  login: async ({ request, url, cookies }) => {
    const loginForm = await superValidate(
      request,
      zod(ZodValidationSchema.loginSchema),
    );

    const { username, password } = loginForm.data;

    const existingUser = await UserService.getUserByUsername(username);

    if (!existingUser) {
      return message(loginForm, "User not found", { status: 406 });
    }

    if (!existingUser.hashedPassword) {
      return;
    }

    const { hashedPassword } = existingUser.hashedPassword;

    const validPassword = await new Argon2id().verify(hashedPassword, password);

    if (!validPassword) {
      return message(loginForm, "Invalid password", { status: 406 });
    }

    await UserService.updateUserLoginDate(existingUser.id);

    await createAndSetSession(lucia, existingUser.id, cookies);

    const redirectTo = url.searchParams.get("redirectTo");

    if (redirectTo !== null) {
      throw redirect(302, `${redirectTo.slice(1)}`);
    }

    const path = () => {
      return match(existingUser.role)
        .with("ADMIN", () => route("/admin"))
        .with("PARENT", () => route("/parent"))
        .with("TUTOR", () => route("/tutor"))
        .with("STUDENT", () => route("/student"))
        .otherwise(() => route("/user-profile"));
    };

    const redirection = path();

    if (redirection) {
      throw redirect(302, redirection);
    }
  },

  register: async ({ cookies, request }) => {
    const registrationForm = await superValidate(
      request,
      zod(ZodValidationSchema.registerSchema),
    );

    if (!registrationForm.valid) {
      return message(registrationForm, "Invalid form", { status: 406 });
    }

    //destructured object data from registration form
    const {
      username,
      email,
      firstName,
      lastName,
      sourceInfo,
      password,
      confirmPassword,
    } = registrationForm.data;

    //get all users
    const users = await UserService.getAllUsers();

    //check if user exists
    if (users.some((user) => user.username === username)) {
      return message(registrationForm, "Username already exists", {
        status: 406,
      });
    }

    //check if email exists
    if (users.some((user) => user.email === email)) {
      return message(registrationForm, "Email already exists", { status: 406 });
    }

    //check if password was confirmed
    if (password !== confirmPassword) {
      return message(registrationForm, "Passwords do not match", {
        status: 406,
      });
    }

    const userId = generateId(15);

    const hashedPassword = await new Argon2id().hash(password);

    await UserService.createUser(
      {
        id: userId,
        username,
        email,
        firstName,
        lastName,
        sourceInfo,
        role: "USER",
        isEmailVerified: "FALSE",
      },
      { passwordId: generateId(15), hashedPassword },
    );

    const verificationCode = await generateEmailVerificationCode(userId, email);

    await sendVerificationCode(email, verificationCode);

    await createAndSetSession(lucia, userId, cookies);

    return message(
      registrationForm,
      "Registered successfully and verification code sent to your email",
    );
  },

  sendResetPasswordEmail: async ({ request }) => {
    const resetPasswordFormData = await superValidate(
      request,
      zod(ZodValidationSchema.resetPasswordEmailSchema),
    );

    if (!resetPasswordFormData.valid) {
      return message(resetPasswordFormData, "Invalid form submission", {
        status: 406,
      });
    }

    const { email } = resetPasswordFormData.data;

    const existingUser = await UserService.getUserByEmail(email);

    if (!existingUser) {
      return message(resetPasswordFormData, "Email not registered", {
        status: 406,
      });
    }

    if (existingUser.isEmailVerified === "FALSE") {
      return message(resetPasswordFormData, "Email not verified", {
        status: 406,
      });
    }

    const resetToken = await createPasswordResetToken(existingUser.id);

    await sendResetPasswordToken(existingUser.email, resetToken);

    return message(resetPasswordFormData, "Reset link succesfully sent");
  },
};
