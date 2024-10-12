import db from "../db";

export const getPasswordByUserId = async (userId: string) => {
  return await db.password.findUnique({
    where: { userId },
    select: {
      hashedPassword: true,
    },
  });
};

export const databasePasswordTransaction = async (
  userId: string,
  hashedPassword: string,
) => {
  return await db.$transaction(async (tx) => {
    await tx.passwordReset.delete({
      where: { userId },
    });

    await tx.password.update({
      where: { userId },
      data: { hashedPassword },
      select: { passwordId: true, userId: true, hashedPassword: true },
    });
  });
};
