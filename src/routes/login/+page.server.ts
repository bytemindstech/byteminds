import type { Actions } from "./$types";
import * as UserService from "$lib/server/user.service";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
  login: async (event) => {
    console.log(event.url);
    const loginResult = await UserService.loginUser(event);

    if (loginResult && loginResult.success) {
      const redirectTo = event.url.searchParams.get("redirectTo");

      if (redirectTo !== null) {
        redirect(302, `${redirectTo.slice(1)}`);
      }
      console.log("redirectTo: " + { redirectTo });
      redirect(302, "/user");
    }
  },
};
