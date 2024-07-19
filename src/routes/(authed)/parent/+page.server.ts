import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { route } from "$lib/ROUTES";
import { getUserById } from "$lib/server/user.service";

export const load = (async ({ locals, url, parent }) => {
  await parent();

  if (!locals.user) {
    return;
  }

  const user = await getUserById(locals.user.id as string);
  
  if (!user?.emailVerified?.isEmailVerified) {
    throw redirect(
      302,
      route("/email-verification") + `?redirectTo=${url.pathname}`,
    );
  }

  return {};
}) satisfies PageServerLoad;
