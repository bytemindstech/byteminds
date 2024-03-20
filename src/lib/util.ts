import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import { lucia } from "./server/auth";
import type { RequestEvent } from "../routes/login/$types";
import type { User } from "lucia";
import nodemailer from "nodemailer";
import * as EmailService from "./server/email.service";
import * as UserService from "./server/user.service";

export const generateEmailVerificationCode = async (
  userId: string,
  email: string,
): Promise<string> => {
  const existingVerificationCode =
    await EmailService.getEmailVerificationCodeByUserId(userId);

  if (existingVerificationCode) {
    await EmailService.deleteEmailVerificationCodeByUserId(userId);
  }

  const code = generateRandomString(6, alphabet("0-9", "A-Z"));
  await EmailService.createEmailVerificationCode({
    userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(15, "m")),
  });

  return code;
};

export const sendVerificationCode = async (
  email: string,
  verificationCode: string,
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    service: "gmail",
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
  });
  const url = `${env.URL_EMAIL_VERIFY}/email-verification`;
  const message = {
    from: env.EMAIL_USER,
    to: email,
    subject: "Byteminds Verification Code",
    html: `<center><p>Your verification code is: <span><b>${verificationCode}</b></span></p><a href=${url}>Click to verify email</a></center>`,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log(`Message sent: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending verification code", (error as Error).message);
  }
};

export const validateVerificationCode = async (
  user: User,
  code: string,
): Promise<boolean> => {
  const existingVerificationCode =
    await EmailService.getEmailVerificationCodeByUserId(user.id);

  if (!existingVerificationCode || existingVerificationCode.code !== code) {
    console.log("Invalid Code or no code");
    return false;
  }

  console.log("Existing Verification Code: %o", existingVerificationCode);

  await EmailService.deleteEmailVerificationCodeByUserId(user.id);
  if (!isWithinExpirationDate(existingVerificationCode.expiresAt)) {
    console.log("Code expired");
    return false;
  }

  if (existingVerificationCode.email !== user.email) {
    return false;
  }
  return true;
};

export const loginUser = async (event: RequestEvent): Promise<LoginResult> => {
  const data = await event.request.formData();
  const username = data.get("username");
  const password = data.get("password");

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

  const existingUser = await UserService.getUserByUsername(username as string);

  if (!existingUser) {
    return fail(400, { message: "Incorrect username or password" });
  }

  const validPassword = await new Argon2id().verify(
    existingUser.hashed_password,
    password,
  );
  if (!validPassword) {
    console.log("incorrect password");
    return fail(400, { message: "Incorrect username or password" });
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
    path: ".",
    ...sessionCookie.attributes,
  });

  console.log("login successful");
  return { success: true };
};
