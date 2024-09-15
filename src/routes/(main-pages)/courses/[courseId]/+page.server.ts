import { getCourseById } from "$lib/server/course.service";
import { getUserById } from "$lib/server/user.service";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const course = await getCourseById(params.courseId);
  const user = await getUserById(course?.userId as string);

  return { course, user };
}) satisfies PageServerLoad;
