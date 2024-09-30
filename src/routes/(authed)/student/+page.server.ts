import { route } from "$lib/ROUTES";
import { getAllUsers, getUserById } from "$lib/server/user.service";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, parent }) => {
  await parent();

  if (!locals.user) {
    return;
  }
  const users = getAllUsers();
  const user = await getUserById(locals.user.id as string);

  if (!user) {
    return;
  }

  if (!user.role) {
    return;
  }

  if (user.role !== "STUDENT") {
    throw redirect(302, route("/user-profile"));
  }

  return { users };
}) satisfies PageServerLoad;
