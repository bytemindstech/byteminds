import db from "./db";
import { Role, type Password, type User } from "@prisma/client";

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
      hashedPassword: true,
      sourceInfo: true,
      isEmailVerified: true,
      profile: true,
      role: true,
      courses: true,
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
    include: {
      hashedPassword: true,
      profile: true,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: { email },
    include: {
      passwordReset: true,
    },
  });
};

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
    include: { profile: true },
  });
};

/**
 * @function
 * Create a new user in the database
 */
export const createUser = async (
  user: Omit<User, "createdAt" | "updatedAt">,
  password: Omit<Password, "userId">,
) => {
  const { id, username, email, firstName, lastName, sourceInfo } = user;
  const { passwordId, hashedPassword } = password;

  return await db.user.create({
    data: {
      id,
      username,
      email,
      firstName,
      lastName,
      sourceInfo,
      hashedPassword: { create: { passwordId, hashedPassword } },
    },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      sourceInfo: true,
      hashedPassword: true,
      isEmailVerified: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

/**
 * @function
 * Update the email verified status of a user in the database
 * @param userId
 * @returns user object
 */
export const updateUserEmailVerified = async (userId: string) => {
  return await db.user.update({
    where: { id: userId },
    data: {
      isEmailVerified: "TRUE",
    },
    select: {
      id: true,
      isEmailVerified: true,
    },
  });
};

export const updateUserLoginDate = async (userId: string) => {
  return await db.user.update({
    where: { id: userId },
    data: {
      updatedAt: new Date(),
    },
    select: {
      updatedAt: true,
    },
  });
};

export const updateUserRole = async (userId: string, role: Role) => {
  return await db.user.update({
    where: { id: userId },
    data: {
      role,
    },
    select: {
      role: true,
    },
  });
};
