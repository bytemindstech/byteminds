import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  console.log(event.url);

  if (!event.locals.user) {
    const srcUrl = event.url.pathname + event.url.search;

    throw redirect(302, `/login?redirectTo=${srcUrl}`);
  }

  let user = event.cookies.get("user");
  return { user };
};

//hindi pa gumagana ang action
export const actions: Actions = {
  logout: async (event) => {
    event.cookies.delete("user", { path: "/" });
    event.locals.user = null;
  },
};
