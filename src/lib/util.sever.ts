/**
 * PUT YOUR REUSABLE SERVER SIDE FUNCTIONS HERE
 */

import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { env } from "$env/dynamic/private";
import nodemailer from "nodemailer";
import * as EmailService from "./server/email.service";
import { generateId, type User } from "lucia";

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
    id: generateId(15),
    userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(24, "h")),
  });

  return code;
};

const SMTP_HOST = env.SMTP_HOST ?? "smtp.gmail.com";
const SMTP_PORT = env.SMTP_PORT ? Number(env.SMTP_PORT) : 465;
const SMTP_SECURE = env.SMTP_SECURE === "true";

export const sendVerificationCode = async (
  email: string,
  verificationCode: string,
) => {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true, // use SSL
    service: "gmail",
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
  });

  const existingVerificationCode =
    await EmailService.getEmailVerificationCodeByEmail(email);

  if (!existingVerificationCode) {
    return;
  }

  const dteOptions: Intl.DateTimeFormatOptions = {
    dateStyle: "full",
    timeStyle: "full",
    timeZone: "Asia/Manila",
  };

  const formatDate = new Intl.DateTimeFormat("en-PH", dteOptions).format(
    existingVerificationCode.expiresAt,
  );

  const message = {
    from: env.EMAIL_USER,
    to: email,
    subject: `Email verification code: ${verificationCode}`,
    html: `<div><p>Verify your email, you've registered to ByteMinds using ${existingVerificationCode.email}</p><p>Use this code to finish setting up your profile: ${verificationCode}</p><p>This code will expire on ${formatDate}</p></div>`,
  };

  try {
    await transporter.sendMail(message);
  } catch (error) {
    console.error("Error sending verification code", (error as Error).message);
  }
};

type ValidateVerificationCode = {
  valid: boolean;
  message: string;
};

export const validateVerificationCode = async (
  user: User,
  code: string,
): Promise<ValidateVerificationCode> => {
  const existingVerificationCode =
    await EmailService.getEmailVerificationCodeByUserId(user.id);

  if (!existingVerificationCode || existingVerificationCode.code !== code) {
    console.log("invalid code");
    return { valid: false, message: "Invalid Code" };
  }

  await EmailService.deleteEmailVerificationCodeByUserId(user.id);
  if (!isWithinExpirationDate(existingVerificationCode.expiresAt)) {
    console.log("Code expired");
    return { valid: false, message: "Code Expired" };
  }

  if (existingVerificationCode.email !== user.email) {
    return { valid: false, message: "Email mismatch" };
  }
  return { valid: true, message: "Verification code valid" };
};
