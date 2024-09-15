import { route } from "$lib/ROUTES";
import { getAllUsers, getUserById } from "$lib/server/user.service";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getAllCourses } from "$lib/server/course.service";

export const load = (async ({ locals, parent }) => {
  await parent();

  if (!locals.user) {
    return;
  }
  const users = await getAllUsers();
  const courses = await getAllCourses();
  const user = await getUserById(locals.user.id as string);

  const tutorCounts = users.filter((user) => user.role?.isTutor).length;

  if (!user) {
    return;
  }

  if (!user.role) {
    return;
  }

  if (!user.role.isStudent) {
    throw redirect(302, route("/user-profile"));
  }

  return { tutorCounts, courses };
}) satisfies PageServerLoad;
