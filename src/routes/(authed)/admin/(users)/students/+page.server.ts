import { getAllUsers } from "$lib/server/user.service";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, parent }) => {
  await parent();

  // const users = getAllUsers();
  return {
    user: locals.user,
  };
}) satisfies PageServerLoad;
