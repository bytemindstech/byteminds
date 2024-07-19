import { redirect } from "@sveltejs/kit";
import { route } from "$lib/ROUTES";
import { getUserById } from "$lib/server/user.service";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import * as RoleService from "$lib/server/role.service";

export const load = (async ({ locals, url, parent }) => {
  await parent();

  const user = await getUserById(locals.user?.id as string);

  if (!user?.emailVerified?.isEmailVerified) {
    throw redirect(
      302,
      route("/email-verification") + `?redirectTo=${url.pathname}`,
    );
  }

  const userRoleForm = await superValidate(
    zod(ZodValidationSchema.userRoleSchema),
  );

  return { userRoleForm };
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
      await RoleService.updateRole(
        { isParent: true, isStudent: false, isTutor: false },
        locals.user?.id as string,
      );
    }

    if (userRoleForm.data.role === "student") {
      await RoleService.updateRole(
        { isParent: false, isStudent: true, isTutor: false },
        locals.user?.id as string,
      );
    }

    if (userRoleForm.data.role === "tutor") {
      await RoleService.updateRole(
        { isParent: false, isStudent: false, isTutor: true },
        locals.user?.id as string,
      );
    }

    return message(
      userRoleForm,
      "Role updated successfully, please logout and login again",
    );
  },
};
