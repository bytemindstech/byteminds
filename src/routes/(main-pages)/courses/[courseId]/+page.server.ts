import { getCourseById } from "$lib/server/course.service";
import { getAllUsers, getUserById } from "$lib/server/user.service";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const users = getAllUsers();
  
  return { users };
}) satisfies PageServerLoad;
