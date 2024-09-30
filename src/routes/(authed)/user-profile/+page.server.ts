import { redirect } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { match } from "ts-pattern";
import { route } from "$lib/ROUTES";
import { getAllUsers, getUserById } from "$lib/server/user.service";
import type { Actions, PageServerLoad } from "./$types";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import * as UserService from "$lib/server/user.service";

export const load = (async ({ locals, url, parent }) => {
  await parent();

  const users = await getAllUsers();
  const user = await getUserById(locals.user?.id as string);
  const tutors = users.filter((user) => user.role === "TUTOR");

  if (!user) {
    return;
  }

  const redirectTo = () => {
    
    return match(user.role) // alternative for switch statement of if-else
      .with("ADMIN", () => route("/admin"))
      .with("PARENT", () => route("/parent"))
      .with("TUTOR", () => route("/tutor"))
      .with("STUDENT", () => route("/student"))
      .otherwise(() => {
        if (user.isEmailVerified === "FALSE") {
          return route("/email-verification") + `?redirectTo=${url.pathname}`;
        }
        return null;
      });
  };

  // execute redirectTo function
  const redirection = redirectTo();

  if (redirection) {
    throw redirect(302, redirection);
  }

  const userRoleForm = await superValidate(
    zod(ZodValidationSchema.userRoleSchema),
  );

  return { userRoleForm, user, tutors };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const userRoleForm = await superValidate(
      request,
      zod(ZodValidationSchema.userRoleSchema),
    );

    if (!userRoleForm.valid) {
      return message(userRoleForm, "invalid form", { status: 406 });
    }

    if (userRoleForm.data.role === "parent") {
      await UserService.updateUserRole(locals.user?.id as string, "PARENT");
    }

    if (userRoleForm.data.role === "student") {
      await UserService.updateUserRole(locals.user?.id as string, "STUDENT");
    }

    if (userRoleForm.data.role === "tutor") {
      await UserService.updateUserRole(locals.user?.id as string, "TUTOR");
    }

    return message(
      userRoleForm,
      "Role updated successfully, please logout and login again",
    );
  },
};
