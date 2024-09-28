import { getCourseById } from "$lib/server/course.service";
import { getUserById } from "$lib/server/user.service";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const course = await getCourseById(params.courseId);
  const user = await getUserById(course?.userId as string);
  const title = "ByteMinds PH - " + course?.title;

  return { course, user, title };
}) satisfies PageServerLoad;
