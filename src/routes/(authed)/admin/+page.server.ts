import { getAllUsers } from "$lib/server/user.service";
import type { PageServerLoad } from "./$types";

export const load = (async ({ parent, locals }) => {
  await parent();

  const users = getAllUsers();

  return {
    user: locals.user,
    users,
  };
}) satisfies PageServerLoad;
