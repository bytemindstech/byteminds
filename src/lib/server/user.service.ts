import { db } from "./db";
import type { User } from "@prisma/client";

/**
 * @function
 * Retrieve all users from the database
 * @returns
 * user object
 */
export const getAllUsers = async () => {
  return db.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      firstName: true,
      lastName: true,
      hashed_password: true,
      profile: true,
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
  return db.user.findUnique({
    where: { username },
    include: { profile: true },
  });
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
    email_verified,
  } = user;
  return db.user.create({
    data: {
      id,
      username,
      email,
      firstName,
      lastName,
      hashed_password,
      email_verified,
    },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      hashed_password: true,
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
    | "createdAt"
    | "updatedAt"
  >,
  id: string,
): Promise<User> => {
  const { email_verified } = user;

  return db.user.update({
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
      createdAt: true,
      updatedAt: true,
      email_verified: true,
    },
  });
};
