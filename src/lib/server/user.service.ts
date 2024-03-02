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
const getUserByUsername = async (username: string) => {
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
  user: Omit<User, "id" | "createdAt">
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

/**
 *
 * @param username
 * @param password
 * @returns user and message object"
 */
export const loginUser = async (username: string, password: string) => {
  try {
    //get user credential from the database
    const user = await getUserByUsername(username);

    //check if user is available in the database
    if (!user) {
      return {
        message: `User, ${username} not found in the database. Please create an account`,
      };
    }
    //checking the encryted password from database to the given password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { auth: false, message: "Invalid password" };
    }

    //session or token authentication logic here

    return { auth: true, message: "Login Successfuly", user };
  } catch (error) {
    console.error((error as Error).message);
  }
};
