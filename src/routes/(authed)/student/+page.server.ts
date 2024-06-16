import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { route } from "$lib/ROUTES";

export const load = (async ({ locals, url, parent }) => {
  await parent();

  return {};
}) satisfies PageServerLoad;
