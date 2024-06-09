import db from "./db";
import type { Role } from "@prisma/client";
import { error } from "@sveltejs/kit";

export const createRole = async (role: Role): Promise<Role> => {
  try {
    // Executes a transaction, ensuring atomicity for a group of database operations.
    const createdRole = await db.$transaction(async (tx) => {
      return await tx.role.create({
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
    });

    return createdRole;
  } catch (e) {
    console.error("Unable to assigned role", e);
    error(404, { message: "Unable to assigned role" });
  }
};

export const updateRole = async (role: Role, id: string) => {
  try {
    const updatedRole = await db.$transaction(async (tx) => {
      return await tx.role.update({
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
    });

    return updatedRole;
  } catch (e) {
    console.error("Unable to update role", e);
    error(404, { message: "Unable to update role" });
  }
};
