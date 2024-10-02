import { redirect } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { match } from "ts-pattern";
import { route } from "$lib/ROUTES";
import { getAllUsers } from "$lib/server/user.service";
import type { Actions, PageServerLoad } from "./$types";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import * as UserService from "$lib/server/user.service";
import type { Role } from "@prisma/client";

export const load = (async ({ locals, url, parent }) => {
  await parent();

  if (!locals.user) {
    return;
  }
  const users = getAllUsers();

  const redirectTo = () => {
    return match(locals.user?.role) // alternative for switch statement of if-else
      .with("ADMIN", () => route("/admin"))
      .with("PARENT", () => route("/parent"))
      .with("TUTOR", () => route("/tutor"))
      .with("STUDENT", () => route("/student"))
      .otherwise(() => {
        if (!locals.user?.isEmailVerified) {
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

  return { userRoleForm, users };
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

    const roleMapping: Record<string, Role> = {
      parent: "PARENT",
      student: "STUDENT",
      tutor: "TUTOR",
    };

    const selectedRole = roleMapping[userRoleForm.data.role];
    if (selectedRole) {
      await UserService.updateUserRole(locals.user?.id as string, selectedRole);
    }

    return message(
      userRoleForm,
      "Role updated successfully, please logout and login again",
    );
  },
};
