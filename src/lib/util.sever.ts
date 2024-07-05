/**
 * PUT YOUR REUSABLE SERVER SIDE FUNCTIONS HERE
 */

import { SMTP_HOST, SMTP_PORT, SMTP_SECURE, URL } from "./constant";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { env } from "$env/dynamic/private";
import { route } from "./ROUTES";
import { Argon2id } from "oslo/password";
import { generateId, type Lucia, type User } from "lucia";
import type { Cookies } from "@sveltejs/kit";
import dateFormatter from "@jhenbert/date-formatter";
import * as mod from "@jhenbert/byteminds-util";
import * as EmailService from "./server/email.service";
import * as ResetPasswordService from "./server/reset-password.service";
import * as PasswordService from "./server/password.service";
import * as UserService from "./server/user.service";

type ValidateVerificationCode = {
  valid: boolean;
  message: string;
};

const dateOptions: Intl.DateTimeFormatOptions = {
  dateStyle: "full",
  timeStyle: "full",
  timeZone: "Asia/Manila",
};

const mailTransporterParams = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  service: "gmail",
  email: env.EMAIL_USER,
  password: env.EMAIL_PASSWORD,
};

export const generateEmailVerificationCode = async (
  userId: string,
  email: string,
): Promise<string> => {
  const code = generateRandomString(6, alphabet("0-9", "A-Z"));
  const expiresAt = createDate(new TimeSpan(24, "h"));

  //delete email verification code if exist and create new one
  await EmailService.databaseEmailVerificationCodeTransaction(
    userId,
    email,
    code,
    expiresAt,
  );

  return code;
};

export const sendVerificationCode = async (
  email: string,
  verificationCode: string,
) => {
  const transporter = mod.mailTransporter(
    mailTransporterParams.host,
    mailTransporterParams.port,
    mailTransporterParams.secure,
    mailTransporterParams.service,
    mailTransporterParams.email,
    mailTransporterParams.password,
  );

  const existingVerificationCode =
    await EmailService.getEmailVerificationCodeByEmail(email);

  if (!existingVerificationCode) {
    return;
  }

  const formatDate = dateFormatter(
    "en-PH",
    dateOptions,
    existingVerificationCode.expiresAt,
  );

  let subject = `Email verification code: ${verificationCode}`;

  let htmlContent = `<div style="font-family: Arial, sans-serif; padding: 20px; color: #260202;">
  <h1>Verification Code</h1>
  <p>Verify your email, you've registered to ByteMinds using ${existingVerificationCode.email}</p>
  
  <p>Use this code to finish setting up your profile: ${verificationCode}</p>
  <p>This code will expire on ${formatDate}</p>
  </div>`;

  const message = mod.composeMessage(
    env.EMAIL_USER,
    email,
    subject,
    htmlContent,
  );

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.error("Error sending verification code", (error as Error).message);
  }
};

export const validateVerificationCode = async (
  user: User,
  code: string,
): Promise<ValidateVerificationCode> => {
  const existingVerificationCode =
    await EmailService.getEmailVerificationCodeByUserId(user.id);

  if (!existingVerificationCode || existingVerificationCode.code !== code) {
    return { valid: false, message: "Invalid Code" };
  }

  await EmailService.deleteEmailVerificationCodeByUserId(user.id);

  if (!isWithinExpirationDate(existingVerificationCode.expiresAt)) {
    return { valid: false, message: "Code Expired" };
  }

  if (existingVerificationCode.email !== user.email) {
    return { valid: false, message: "Email mismatch" };
  }

  return { valid: true, message: "Verification code valid" };
};

export const sendResetPasswordToken = async (
  email: string,
  resetToken: string,
) => {
  const transporter = mod.mailTransporter(
    mailTransporterParams.host,
    mailTransporterParams.port,
    mailTransporterParams.secure,
    mailTransporterParams.service,
    mailTransporterParams.email,
    mailTransporterParams.password,
  );

  const existingUser = await UserService.getUserByEmail(email);

  if (!existingUser) {
    return;
  }

  if (!existingUser.passwordReset) {
    return;
  }

  const formatDate = dateFormatter(
    "en-PH",
    dateOptions,
    existingUser.passwordReset.expiresAt,
  );

  let subject = "Password Reset Request";

  let htmlContent = `<div style="font-family: Arial, sans-serif; padding: 20px; color: #260202;">
		<h1>Password Reset Request</h1>
		<p>We've received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using the link below.</p>

		<p>
		<a href="${URL}${route("/password-reset")}?token=${resetToken}" style="color: #337ab7; text-decoration: none;">Reset your password</a>
		</p>

		<p>If you need help or have any questions, please contact our support team. We're here to help!</p>
    
    <p>This code will expire on ${formatDate}</p>
	</div>`;

  const message = mod.composeMessage(
    env.EMAIL_USER,
    email,
    subject,
    htmlContent,
  );

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.error(
      "Error sending reset password email",
      (error as Error).message,
    );
  }
};

export const createPasswordResetToken = async (userId: string) => {
  const tokenId = generateId(40);
  const expiresAt = createDate(new TimeSpan(1, "h"));

  //database transaction delete and create reset token
  await ResetPasswordService.databaseResetPasswordTransaction(
    userId,
    tokenId,
    expiresAt,
  );

  return tokenId;
};

export const verifyPasswordResetToken = async (tokenId: string) => {
  const passwordResetToken = await ResetPasswordService.getTokenById(tokenId);

  if (!passwordResetToken || passwordResetToken.id !== tokenId) {
    return {
      valid: false,
      message: "Password reset link token is invalid. Please request new one",
    };
  }

  if (!isWithinExpirationDate(passwordResetToken.expiresAt)) {
    return {
      valid: false,
      message: "Password reset link token has expired. Please request new one",
    };
  }

  return {
    userId: passwordResetToken.userId,
    valid: true,
    message: "Password reset link token is valid",
  };
};

export const isSameAsOldPassword = async (
  userId: string,
  newPassword: string,
) => {
  const existingPassword = await PasswordService.getPasswordByUserId(userId);

  if (!existingPassword) {
    return false;
  }

  const isSamePassword = await new Argon2id().verify(
    existingPassword.hashedPassword,
    newPassword,
  );

  return isSamePassword;
};

export const createAndSetSession = async (
  lucia: Lucia,
  userId: string,
  cookies: Cookies,
) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: ".",
    ...sessionCookie.attributes,
  });
};

export const deleteSessionCookie = async (lucia: Lucia, cookies: Cookies) => {
  const sessionCookie = lucia.createBlankSessionCookie();

  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: ".",
    ...sessionCookie.attributes,
  });
};
