import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { lucia } from "$lib/server/auth";
import { deleteSessionCookie } from "$lib/util.sever";

export const actions: Actions = {
  default: async ({ locals, cookies }) => {
    if (!locals.session) {
      return fail(401);
    }

    await lucia.invalidateSession(locals.session.id);

    await deleteSessionCookie(lucia, cookies);

    redirect(302, "/");
  },
};
