import { getAllCourses } from "$lib/server/course.service";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const courses = getAllCourses();

  return { courses };
}) satisfies PageServerLoad;
