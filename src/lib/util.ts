import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { env } from "$env/dynamic/private";
import type { User } from "lucia";
import nodemailer from "nodemailer";
import * as EmailService from "./server/email.service";

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

  try {
    let message = {
      from: env.EMAIL_USER,
      to: email,
      subject: "Byteminds Verification Code",
      text: `Your verification code is ${verificationCode}`,
    };
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
