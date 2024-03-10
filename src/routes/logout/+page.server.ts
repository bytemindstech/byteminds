import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

//hindi pa gumagana ang action
export const actions: Actions = {
  logout: async (event) => {
    event.cookies.delete("user", { path: "/" });
    event.locals.user = null;
    
    throw redirect(302, "/");
  },
};
