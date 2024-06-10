import db from "./db";
import type { User } from "@prisma/client";

/**
 * @function
 * Retrieve all users from the database
 * @returns
 * user object
 */
export const getAllUsers = async () => {
  return await db.user.findMany({
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
};

/**
 * @function
 * Retrieve a user by username from the database
 * @param username
 * @returns
 * user object including the profile object
 */
export const getUserByUsername = async (username: string) => {
  return await db.user.findUnique({
    where: { username },
    include: { profile: true, role: true },
  });
};

/**
 * @function
 * Create a new user in the database
 */
export const createUser = async (
  user: Omit<User, "createdAt" | "updatedAt">,
) => {
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

  return await db.user.create({
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
) => {
  const { email_verified } = user;

  return await db.user.update({
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
};
