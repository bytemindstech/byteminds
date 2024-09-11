import { route } from "$lib/ROUTES";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getUserById } from "$lib/server/user.service";

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

  if (!user.role.isTutor) {
    throw redirect(302, route("/user-profile"));
  }

  return {};
}) satisfies PageServerLoad;
