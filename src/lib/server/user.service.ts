import type { RequestEvent } from "../../routes/login/$types";
import { fail, redirect, type ActionFailure } from "@sveltejs/kit";
import { db } from "./db";
import { Argon2id } from "oslo/password";
import { lucia } from "./auth";

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
  user: Omit<User, "createdAt">,
): Promise<User> => {
  const { id, username, email, firstName, lastName, hashed_password } = user;
  return db.user.create({
    data: {
      id,
      username,
      email,
      firstName,
      lastName,
      hashed_password,
    },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      hashed_password: true,
    },
  });
};

export const loginUser = async (event: RequestEvent): Promise<LoginResult> => {
  const data = await event.request.formData();
  const username = data.get("username");
  const password = data.get("password");

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return fail(400, { message: "Invalid username" });
  }

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return fail(400, { message: "Invalid password" });
  }

  const existingUser = await getUserByUsername(username as string);

  if (!existingUser) {
    return fail(400, { message: "Incorrect username or password" });
  }

  const validPassword = await new Argon2id().verify(
    existingUser.hashed_password,
    password,
  );
  if (!validPassword) {
    console.log("incorrect password");
    return fail(400, { message: "Incorrect username or password" });
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
    path: ".",
    ...sessionCookie.attributes,
  });

  console.log("login successful");
  return { success: true };
};
