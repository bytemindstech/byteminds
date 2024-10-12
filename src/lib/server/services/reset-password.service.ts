import db from "../db";

export const getTokenById = async (id: string) => {
  return await db.passwordReset.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      expiresAt: true,
    },
  });
};

export const databaseResetPasswordTransaction = async (
  userId: string,
  tokenId: string,
  expiresAt: Date,
) => {
  return await db.$transaction(async (tx) => {
    const count = await tx.passwordReset.count({
      where: { userId },
    });

    if (count > 0) {
      await tx.passwordReset.delete({
        where: { userId },
      });
    }

    return await tx.passwordReset.create({
      data: {
        id: tokenId,
        userId,
        expiresAt,
      },
      select: {
        id: true,
        userId: true,
        expiresAt: true,
      },
    });
  });
};
