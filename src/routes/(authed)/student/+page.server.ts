import { route } from "$lib/ROUTES";
import { getAllUsers } from "$lib/server/services/user.service";
import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, parent }) => {
  await parent();

  if (!locals.user) {
    return;
  }

  const users = getAllUsers();

  if (locals.user.role !== "STUDENT") {
    throw redirect(302, route("/user-profile"));
  }

  return { users };
}) satisfies PageServerLoad;
