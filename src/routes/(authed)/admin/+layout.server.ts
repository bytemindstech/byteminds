import { getAllCourses } from "$lib/server/services/course.service";
import { getAllUsers } from "$lib/server/services/user.service";
import type { LayoutServerLoad } from "./$types";

export const load = (async () => {

  const courses = getAllCourses();
  const users = getAllUsers();
  return { users, courses };
}) satisfies LayoutServerLoad;
