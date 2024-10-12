import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { route } from "$lib/ROUTES";

export const load = (async ({ locals }) => {
  if (!locals.user) {
    return;
  }

  if (locals.user.role !== "ADMIN") {
    throw redirect(302, route("/user-profile"));
  }

  return {};
}) satisfies PageServerLoad;
