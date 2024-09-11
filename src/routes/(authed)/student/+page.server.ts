import { route } from "$lib/ROUTES";
import { getUserById } from "$lib/server/user.service";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, url, parent }) => {
  await parent();

  if (!locals.user) {
    return;
  }

  const user = await getUserById(locals.user.id as string);

  if (!user) {
    return;
  }

  if (!user.role) {
    return;
  }

  if (!user.role.isStudent) {
    throw redirect(302, route("/user-profile"));
  }

  return {
    user,
  };
}) satisfies PageServerLoad;
