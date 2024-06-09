import db from "./db";
import type { User } from "@prisma/client";
import { error } from "@sveltejs/kit";

/**
 * @function
 * Retrieve all users from the database
 * @returns
 * user object
 */
export const getAllUsers = async (): Promise<User[]> => {
  try {
    // Executes a transaction, ensuring atomicity for a group of database operations.
    const allUsers = await db.$transaction(async (tx) => {
      return await tx.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          hashed_password: true,
          source_info: true,
          email_verified: true,
          profile: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    });

    return allUsers;
  } catch (e) {
    console.log("Unable to get all users", e);
    error(404, { message: "Unable to get all users" });
  }
};

/**
 * @function
 * Retrieve a user by username from the database
 * @param username
 * @returns
 * user object including the profile object
 */
export const getUserByUsername = async (
  username: string,
): Promise<User | null> => {
  try {
    const userByUsername = await db.$transaction(async (tx) => {
      return await tx.user.findUnique({
        where: { username },
        include: { profile: true, role: true },
      });
    });

    return userByUsername;
  } catch (e) {
    console.error(`Error retrieving user, ${username}`, e);
    error(404, { message: "Unable to get user" });
  }
};

/**
 * @function
 * Create a new user in the database
 */
export const createUser = async (
  user: Omit<User, "createdAt" | "updatedAt">,
): Promise<User> => {
  const {
    id,
    username,
    email,
    firstName,
    lastName,
    hashed_password,
    source_info,
    email_verified,
  } = user;

  try {
    const createdUser = await db.$transaction(async (tx) => {
      return await tx.user.create({
        data: {
          id,
          username,
          email,
          firstName,
          lastName,
          hashed_password,
          source_info,
          email_verified,
        },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          hashed_password: true,
          source_info: true,
          createdAt: true,
          updatedAt: true,
          email_verified: true,
        },
      });
    });

    return createdUser;
  } catch (e) {
    console.error("Error creating user", e);
    error(404, { message: "Unable to create user" });
  }
};

/**
 *
 * @param user
 * @param id
 * @returns user object
 */
export const updateUserEmailVerified = async (
  user: Omit<
    User,
    | "id"
    | "username"
    | "email"
    | "firstName"
    | "lastName"
    | "hashed_password"
    | "source_info"
    | "createdAt"
    | "updatedAt"
  >,
  id: string,
): Promise<User> => {
  const { email_verified } = user;
  try {
    const updatedUser = await db.$transaction(async (tx) => {
      return await tx.user.update({
        where: { id },
        data: {
          email_verified,
        },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          hashed_password: true,
          source_info: true,
          createdAt: true,
          updatedAt: true,
          email_verified: true,
        },
      });
    });

    return updatedUser;
  } catch (e) {
    console.error("Error updating verified email", e);
    error(404, { message: "Unable to update verified email" });
  }
};
