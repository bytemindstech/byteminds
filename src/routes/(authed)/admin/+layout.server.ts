import { getAllCourses } from "$lib/server/course.service";
import { getAllUsers } from "$lib/server/user.service";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ parent }) => {
  await parent();

  const courses = await getAllCourses();
  const users = await getAllUsers();
  return { users, courses };
}) satisfies LayoutServerLoad;
