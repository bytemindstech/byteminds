import type { Actions, PageServerLoad } from "./$types";
import * as UserService from "$lib/server/user.service";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
  login: async (event) => {
    console.log(event.url);
    const result = await UserService.loginUser(event);

    if (result && result.success) {
      const redirectTo = event.url.searchParams.get("redirectTo");

      if (redirectTo !== null) {
        redirect(302, `${redirectTo.slice(1)}`);
      }
      redirect(302, "/");
    }
  },
};
