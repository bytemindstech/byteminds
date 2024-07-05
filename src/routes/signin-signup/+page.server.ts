import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/server/auth";
import { route } from "$lib/ROUTES";
import { generateId } from "lucia";
import * as UserService from "$lib/server/user.service";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import {
  createAndSetSession,
  createPasswordResetToken,
  generateEmailVerificationCode,
  sendResetPasswordToken,
  sendVerificationCode,
} from "$lib/util.sever";

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

    const existingUser = await UserService.getUserByUsername(
      loginForm.data.username,
    );

    if (!existingUser) {
      console.log("user not found");
      return message(loginForm, "User not found", { status: 406 });
    }

    if (!existingUser.hashedPassword) {
      return;
    }

    const validPassword = await new Argon2id().verify(
      existingUser.hashedPassword.hashedPassword,
      loginForm.data.password,
    );

    if (!validPassword) {
      console.log("Invalid password");
      return message(loginForm, "Invalid password", { status: 406 });
    }

    await createAndSetSession(lucia, existingUser.id, cookies);

    const redirectTo = url.searchParams.get("redirectTo");

    if (redirectTo !== null) {
      throw redirect(302, `${redirectTo.slice(1)}`);
    }

    if (!existingUser.role) {
      return message(loginForm, "Must have role assigned", { status: 406 });
    }

    switch (true) {
      case existingUser.role.isAdmin:
        throw redirect(302, route("/admin"));
      case existingUser.role.isParent:
        throw redirect(302, route("/parent"));
      case existingUser.role.isTutor:
        throw redirect(302, route("/tutor"));
      case existingUser.role.isStudent:
        throw redirect(302, route("/student"));
      default:
        redirect(302, route("/user-profile"));
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

    //get all users
    const users = await UserService.getAllUsers();

    //check if user exists
    if (
      users.some((user) => user.username === registrationForm.data.username)
    ) {
      return message(registrationForm, "Username already exists", {
        status: 406,
      });
    }

    //check if email exists
    if (users.some((user) => user.email === registrationForm.data.email)) {
      return message(registrationForm, "Email already exists", { status: 406 });
    }

    //check if password was confirmed
    if (
      registrationForm.data.password !== registrationForm.data.confirmPassword
    ) {
      return message(registrationForm, "Passwords do not match", {
        status: 406,
      });
    }

    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(
      registrationForm.data.password,
    );

    await UserService.createUser(
      {
        id: userId,
        username: registrationForm.data.username,
        email: registrationForm.data.email,
        firstName: registrationForm.data.firstName,
        lastName: registrationForm.data.lastName,
        sourceInfo: registrationForm.data.sourceInfo,
      },
      { passwordId: generateId(15), hashedPassword: hashedPassword },
      { emailVerifiedId: generateId(15), isEmailVerified: false },
      {
        roleId: generateId(15),
        isAdmin: false,
        isParent: false,
        isTutor: false,
        isStudent: false,
      },
    );

    const verificationCode = await generateEmailVerificationCode(
      userId,
      registrationForm.data.email,
    );

    await sendVerificationCode(registrationForm.data.email, verificationCode);

    await createAndSetSession(lucia, userId, cookies);

    return message(registrationForm, "Registered successfully");
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

    const existingUser = await UserService.getUserByEmail(
      resetPasswordFormData.data.email,
    );

    if (!existingUser) {
      console.log("user not found");
      return message(resetPasswordFormData, "User not found", {
        status: 406,
      });
    }

    if (!existingUser.emailVerified?.isEmailVerified) {
      return message(resetPasswordFormData, "Email not verified", {
        status: 406,
      });
    }

    const resetToken = await createPasswordResetToken(existingUser.id);

    await sendResetPasswordToken(existingUser.email, resetToken);

    return message(resetPasswordFormData, "Reset link succesfully sent");
  },
};
