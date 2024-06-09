import { error } from "@sveltejs/kit";
import db from "./db";
import type { EmailVerificationCode } from "@prisma/client";

export const createEmailVerificationCode = async (
  verificationCode: EmailVerificationCode,
): Promise<EmailVerificationCode> => {
  try {
    // Executes a transaction, ensuring atomicity for a group of database operations.
    const createdVerificationCode = await db.$transaction(async (tx) => {
      return await tx.emailVerificationCode.create({
        data: verificationCode,
        select: {
          id: true,
          userId: true,
          code: true,
          email: true,
          expiresAt: true,
        },
      });
    });

    return createdVerificationCode;
  } catch (e) {
    console.error("Unable to create verification code", e);
    error(404, { message: "Unable to create verification code" });
  }
};

export const getEmailVerificationCodeById = async (
  id: string,
): Promise<EmailVerificationCode | null> => {
  try {
    const verificationCode = await db.$transaction(async (tx) => {
      return await tx.emailVerificationCode.findUnique({ where: { id } });
    });

    return verificationCode;
  } catch (e) {
    console.error("Unable to get verification code", e);
    error(404, { message: "Unable to get verification code" });
  }
};

export const getEmailVerificationCodeByUserId = async (
  userId: string,
): Promise<EmailVerificationCode | null> => {
  try {
    const verificationCode = await db.$transaction(async (tx) => {
      return await tx.emailVerificationCode.findUnique({ where: { userId } });
    });

    return verificationCode;
  } catch (e) {
    console.error("Unable to get verification code", e);
    error(404, { message: "Unable to get verification code" });
  }
};

export const getEmailVerificationCodeByEmail = async (
  email: string,
): Promise<EmailVerificationCode | null> => {
  try {
    const verificationCode = await db.$transaction(async (tx) => {
      return await tx.emailVerificationCode.findUnique({ where: { email } });
    });

    return verificationCode;
  } catch (e) {
    console.error("Unable to get verification code", e);
    error(404, { message: "Unable to get verification code" });
  }
};

export const deleteEmailVerificationCodeByUserId = async (
  userId: string,
): Promise<void> => {
  try {
    await db.$transaction(async (tx) => {
      await tx.emailVerificationCode.delete({ where: { userId } });
    });
  } catch (e) {
    console.error("Unable to delete verification code", e);
    error(404, { message: "Unable to delete verification code" });
  }
};

export const deleteEmailVerificationCodeById = async (
  id: string,
): Promise<void> => {
  try {
    await db.$transaction(async (tx) => {
      await tx.emailVerificationCode.delete({ where: { id } });
    });
  } catch (e) {
    console.error("Unable to delete verification code", e);
    error(404, { message: "Unable to delete verification code" });
  }
};
