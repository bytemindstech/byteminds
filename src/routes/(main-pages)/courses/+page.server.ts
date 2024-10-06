import type { PageServerLoad } from "./$types";

export const load = (() => {
  return { title: "ByteMinds PH - Available Courses" };
}) satisfies PageServerLoad;
