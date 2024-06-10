import db from "./db";
import type { EmailVerificationCode } from "@prisma/client";

export const createEmailVerificationCode = async (
  verificationCode: EmailVerificationCode,
) => {
  return await db.emailVerificationCode.create({
    data: verificationCode,
    select: {
      id: true,
      userId: true,
      code: true,
      email: true,
      expiresAt: true,
    },
  });
};

export const getEmailVerificationCodeById = async (id: string) => {
  return await db.emailVerificationCode.findUnique({ where: { id } });
};

export const getEmailVerificationCodeByUserId = async (userId: string) => {
  return await db.emailVerificationCode.findUnique({ where: { userId } });
};

export const getEmailVerificationCodeByEmail = async (email: string) => {
  return await db.emailVerificationCode.findUnique({ where: { email } });
};

export const deleteEmailVerificationCodeByUserId = async (userId: string) => {
  await db.emailVerificationCode.delete({ where: { userId } });
};

export const deleteEmailVerificationCodeById = async (id: string) => {
  await db.emailVerificationCode.delete({ where: { id } });
};
