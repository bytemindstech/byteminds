import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";

export const load = (async ({ url, locals }) => {
  if (!locals.user) {
    throw redirect(302, `/login?redirectTo=${url.pathname}`);
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
    emailVerified: locals.user.email_verified,
    email: locals.user.email,
    firstName: locals.user.firstName,
    lastName: locals.user.lastName,
    role: locals.user.role,
  };
}) satisfies LayoutServerLoad;
