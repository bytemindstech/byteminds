import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";
import { loginUser } from "$lib/util";

export const actions: Actions = {
  default: async (event) => {
    console.log(event.url);
    const loginResult = await loginUser(event);

    if (loginResult && loginResult.success) {
      const redirectTo = event.url.searchParams.get("redirectTo");

      if (redirectTo !== null) {
        throw redirect(302, `${redirectTo.slice(1)}`);
      }
      redirect(302, "/user");
    }
    console.log("login failed");
    redirect(302, "/");
  },
};
