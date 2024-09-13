import db from "./db";
import type { EmailVerified, Password, Role, User } from "@prisma/client";

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
      emailVerified: true,
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
      emailVerified: true,
      profile: true,
      role: true,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: { email },
    include: {
      emailVerified: true,
      passwordReset: true,
    },
  });
};

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
    include: { profile: true, role: true, emailVerified: true },
  });
};

/**
 * @function
 * Create a new user in the database
 */
export const createUser = async (
  user: Omit<User, "createdAt" | "updatedAt">,
  password: Omit<Password, "userId">,
  email_verified: Omit<EmailVerified, "userId">,
  role: Omit<Role, "userId">,
) => {
  const { id, username, email, firstName, lastName, sourceInfo } = user;
  const { passwordId, hashedPassword } = password;
  const { emailVerifiedId, isEmailVerified } = email_verified;
  const { roleId, isAdmin, isParent, isStudent, isTutor } = role;

  return await db.user.create({
    data: {
      id,
      username,
      email,
      firstName,
      lastName,
      sourceInfo,
      hashedPassword: { create: { passwordId, hashedPassword } },
      emailVerified: { create: { emailVerifiedId, isEmailVerified } },
      role: { create: { roleId, isAdmin, isParent, isStudent, isTutor } },
    },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      sourceInfo: true,
      hashedPassword: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

/**
 * @function
 * Update the email verified status of a user in the database
 * @param emailVerified
 * @param userId
 * @returns user object
 */
export const updateUserEmailVerified = async (
  email_verified: Omit<EmailVerified, "emailVerifiedId" | "userId">,
  userId: string,
) => {
  const { isEmailVerified } = email_verified;

  return await db.emailVerified.update({
    where: { userId },
    data: {
      isEmailVerified,
    },
    select: {
      emailVerifiedId: true,
      userId: true,
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
