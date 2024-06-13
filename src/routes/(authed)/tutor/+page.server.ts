import { route } from "$lib/ROUTES";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, url, parent }) => {
  await parent();

  if (!locals.user?.email_verified) {
    throw redirect(
      302,
      route("/email-verification") + `?redirectTo=${url.pathname}`,
    );
  }

  return {};
}) satisfies PageServerLoad;
