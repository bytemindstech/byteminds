import {
  deleteCourse,
  getAllCourses,
  getCourseById,
} from "$lib/server/course.service";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { User } from "lucia";

/**
 *
 * @param id - course id
 * @param authUser
 * @returns an object containing success and error message
 */
const requestDeleteCourse = async (id: string, authUser: User | null) => {
  // Check if user is logged in
  if (!authUser) {
    return { message: "Unauthorize access, please login" };
  }

  try {
    await deleteCourse(id);
    return { message: "Course is successfuly deleted" };
  } catch (error) {
    return { errorMessage: (error as Error).message };
  }
};

const requestGetCoursesById = async (id: string, authUser: User | null) => {
  // Check if user is logged in
  if (!authUser) {
    return { message: "Unauthorize access, please login" };
  }

  try {
    return await getCourseById(id);
  } catch (error) {
    console.error("Error while getting courses", (error as Error).message);
  }
};

// Put you request handler functions here
export const DELETE: RequestHandler = async ({ params, locals }) => {
  const { id } = params;
  const response = await requestDeleteCourse(id, locals.user);

  return json(response);
};

export const GET: RequestHandler = async ({ params, locals }) => {
  const { id } = params;
  const response = await requestGetCoursesById(id, locals.user);

  return json(response);
};
