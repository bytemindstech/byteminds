import { generateId } from "lucia";
import db from "../db";

export const getEmailVerificationCodeByUserId = async (userId: string) => {
  return await db.emailVerificationCode.findUnique({ where: { userId } });
};

export const getEmailVerificationCodeByEmail = async (email: string) => {
  return await db.emailVerificationCode.findUnique({ where: { email } });
};

export const deleteEmailVerificationCodeByUserId = async (userId: string) => {
  await db.emailVerificationCode.delete({ where: { userId } });
};

export const databaseEmailVerificationCodeTransaction = async (
  userId: string,
  email: string,
  code: string,
  expiresAt: Date,
) => {
  return await db.$transaction(async (tx) => {
    const count = await tx.emailVerificationCode.count({ where: { userId } });

    if (count > 0) {
      await tx.emailVerificationCode.delete({ where: { userId } });
    }

    return await tx.emailVerificationCode.create({
      data: { id: generateId(15), userId, email, code, expiresAt },
      select: {
        id: true,
        userId: true,
        email: true,
        code: true,
        expiresAt: true,
      },
    });
  });
};
