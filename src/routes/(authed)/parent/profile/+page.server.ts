import { getUserById } from "$lib/server/user.service";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, parent }) => {
  if (!locals.user) {
    return;
  }

  const user = getUserById(locals.user.id as string);

  return { user };
}) satisfies PageServerLoad;
