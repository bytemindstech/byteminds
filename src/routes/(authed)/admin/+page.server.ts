import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { route } from "$lib/ROUTES";
import { getUserById } from "$lib/server/user.service";

export const load = (async ({ locals }) => {
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

  if (!user.role.isAdmin) {
    throw redirect(302, route("/user-profile"));
  }

  return {};
}) satisfies PageServerLoad;
