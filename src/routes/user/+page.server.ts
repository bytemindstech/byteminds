import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  console.log(event.url);

  if (!event.locals.user) {
    const srcUrl = event.url.pathname + event.url.search;
    redirect(302, `/login?redirectTo=${srcUrl}`);
  }

  return { username: event.locals.user.username };
};
