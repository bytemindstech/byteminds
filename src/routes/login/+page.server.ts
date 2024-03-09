import type { Actions, PageServerLoad } from "./$types";
import * as UserService from "$lib/server/user.service";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
  let user = cookies.get("user");

  return { user };
};

export const actions: Actions = {
  login: async (event) => {
    console.log(event.url);
    const result = await UserService.loginUser(event);

    if (result && result.success) {
      const redirectTo = event.url.searchParams.get("redirectTo");

      if (redirectTo !== null) {
        throw redirect(302, `${redirectTo.slice(1)}`);
      }

      throw redirect(302, "/user");
    }
  },
};
