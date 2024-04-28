import { db } from "./db";
import type { EmailVerificationCode } from "@prisma/client";

export const createEmailVerificationCode = async (
  verificationCode: Omit<EmailVerificationCode, "id">,
): Promise<EmailVerificationCode> => {
  const { code, userId, email, expiresAt } = verificationCode;

  return db.emailVerificationCode.create({
    data: {
      code,
      userId,
      email,
      expiresAt,
    },
    select: {
      id: true,
      code: true,
      userId: true,
      email: true,
      expiresAt: true,
    },
  });
};

export const getEmailVerificationCodeById = async (id: string) => {
  return db.emailVerificationCode.findUnique({ where: { id } });
};

export const getEmailVerificationCodeByUserId = async (userId: string) => {
  return db.emailVerificationCode.findUnique({ where: { userId } });
};

export const getEmailVerificationCodeByEmail = async (email: string) => {
  return db.emailVerificationCode.findUnique({ where: { email } });
};

export const deleteEmailVerificationCodeByUserId = async (userId: string) => {
  return db.emailVerificationCode.delete({ where: { userId } });
};

export const deleteEmailVerificationCodeById = async (id: string) => {
  return db.emailVerificationCode.delete({ where: { id } });
};
