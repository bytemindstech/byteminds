import type { RequestEvent } from "../../routes/login/$types";
import { fail, type ActionFailure } from "@sveltejs/kit";
import { db } from "./db";
import bcrypt from "bcrypt";

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
      password: true,
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
  user: Omit<User, "id" | "createdAt">,
): Promise<User> => {
  const { username, email, firstName, lastName, password } = user;
  return db.user.create({
    data: {
      username,
      email,
      firstName,
      lastName,
      password,
    },
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      password: true,
    },
  });
};

export const loginUser = async (
  event: RequestEvent,
): Promise<LoginResult | undefined> => {
  try {
    const data = await event.request.formData();
    const username = data.get("username");
    const password = data.get("password");

    if (!username || !password) {
      return fail(400, { username, missing: true });
    }

    const user = await getUserByUsername(username as string);

    if (!user) {
      console.log("user not found");
      return fail(400, { username, notFound: true });
    }

    const isPasswordMatch = await bcrypt.compare(
      password as string,
      user?.password as string,
    );

    if (!isPasswordMatch) {
      console.log("incorrect password");
      return fail(400, { username, incorrect: true });
    }

    //mock the cookies
    event.cookies.set("user", user.username, { path: "/" });

    console.log("login successful");
    return { success: true };
  } catch (error) {
    console.error((error as Error).message);
  }
};
