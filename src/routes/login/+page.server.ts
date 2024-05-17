import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/server/auth";
import * as UserService from "$lib/server/user.service";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import { route } from "$lib/ROUTES";

export const load = (async () => {
  const form = await superValidate(zod(ZodValidationSchema.loginSchema));
  return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request, url, cookies, locals }) => {
    const form = await superValidate(
      request,
      zod(ZodValidationSchema.loginSchema),
    );

    const existingUser = await UserService.getUserByUsername(
      form.data.username,
    );

    if (!existingUser) {
      console.log("user not found");
      return message(form, "User not found", { status: 406 });
    }

    const validPassword = await new Argon2id().verify(
      existingUser.hashed_password,
      form.data.password,
    );

    if (!validPassword) {
      console.log("Invalid password");
      return message(form, "Invalid password", { status: 406 });
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    const redirectTo = url.searchParams.get("redirectTo");

    if (redirectTo !== null) {
      throw redirect(302, `${redirectTo.slice(1)}`);
    }

    // if (locals.user?.role.isAdmin) {
    //   redirect(302, route("/admin"));
    // }

    // if (locals.user?.role.isParent) {
    //   redirect(302, route("/parents"));
    // }

    // if (locals.user?.role.isTutor) {
    //   redirect(302, route("/tutors"));
    // }

    // if (locals.user?.role.isStudent) {
    //   redirect(302, route("/students"));
    // }

    redirect(302, route("/students"));
  },
};
