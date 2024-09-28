import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import { route } from "$lib/ROUTES";

export const load = (async ({ url, locals }) => {
  if (!locals.user) {
    throw redirect(
      302,
      route("/signin-signup") + `?redirectTo=${url.pathname}`,
    );
  }

  const verifyEmailForm = await superValidate(
    zod(ZodValidationSchema.verifyEmailSchema),
  );

  const resendCodeForm = await superValidate(
    zod(ZodValidationSchema.resendSchema),
  );

  return {
    verifyEmailForm,
    resendCodeForm,
    email: locals.user.email,
    firstName: locals.user.firstName,
    lastName: locals.user.lastName,
    id: locals.user.id,
  };
}) satisfies LayoutServerLoad;
