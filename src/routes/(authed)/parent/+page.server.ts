import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { route } from "$lib/ROUTES";
import { getAllUsers } from "$lib/server/services/user.service";

export const load = (async ({ locals, parent }) => {
  await parent();

  if (!locals.user) {
    return;
  }

  const users = getAllUsers();

  if (locals.user.role !== "PARENT") {
    throw redirect(302, route("/user-profile"));
  }

  return { users };
}) satisfies PageServerLoad;
