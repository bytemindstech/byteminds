import { getAllUsers } from "$lib/server/user.service";
import type { PageServerLoad } from "./$types";

export const load = (async ({ parent }) => {
  await parent();

  const users = await getAllUsers();

  const tutors = users.filter((user) => user.role === "TUTOR");

  return { tutors };
}) satisfies PageServerLoad;
