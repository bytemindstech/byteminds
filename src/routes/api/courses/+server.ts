import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getAllCourses } from "$lib/server/course.service";

const requestGetAllCourses = async () => {
  try {
    return await getAllCourses();
  } catch (error) {
    return { errorMessage: (error as Error).message };
  }
};

// Put you request handler functions here
export const GET: RequestHandler = async () => {
  const response = await requestGetAllCourses();

  return json(response);
};
