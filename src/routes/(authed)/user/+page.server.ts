import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, locals }) => {
  if (!locals.user) {
    throw redirect(302, `/login?redirectTo=${url.pathname}`);
  }

  console.log(url);
  return {
    name: locals.user.firstName,
    emailVerified: locals.user.email_verified,
    email: locals.user.email,
  };
};
