import { getAllUsers } from "$lib/server/user.service";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const users = await getAllUsers();
  const tutors = users.filter((user) => user.role?.isTutor);

  return { tutors };
}) satisfies PageServerLoad;
