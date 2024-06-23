import db from "./db";
import type { Role } from "@prisma/client";

export const createRole = async (role: Role) => {
  return await db.role.create({
    data: role,
    select: {
      roleId: true,
      userId: true,
      isStudent: true,
      isParent: true,
      isTutor: true,
      isAdmin: true,
    },
  });
};

export const updateRole = async (role: Role, userId: string) => {
  return await db.role.update({
    data: role,
    where: { userId },
    select: {
      roleId: true,
      userId: true,
      isStudent: true,
      isParent: true,
      isTutor: true,
      isAdmin: true,
    },
  });
};
