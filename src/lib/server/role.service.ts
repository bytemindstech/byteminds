import { db } from "./db";
import type { Role } from "@prisma/client";

export const createRole = async (role: Omit<Role, "id">): Promise<Role> => {
  const { userId, isStudent, isParent, isTutor, isAdmin } = role;
  return db.role.create({
    data: {
      userId,
      isStudent,
      isParent,
      isTutor,
      isAdmin,
    },
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
