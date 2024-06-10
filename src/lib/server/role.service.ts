import db from "./db";
import type { Role } from "@prisma/client";

export const createRole = async (role: Role) => {
  return await db.role.create({
    data: role,
    select: {
      id: true,
      userId: true,
      isStudent: true,
      isParent: true,
      isTutor: true,
      isAdmin: true,
    },
  });
};

export const updateRole = async (role: Role, id: string) => {
  return await db.role.update({
    data: role,
    where: { id },
    select: {
      id: true,
      userId: true,
      isStudent: true,
      isParent: true,
      isTutor: true,
      isAdmin: true,
    },
  });
};
