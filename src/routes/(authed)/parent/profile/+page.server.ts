import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  if (!locals.user) {
    return;
  }

  return {};
}) satisfies PageServerLoad;
