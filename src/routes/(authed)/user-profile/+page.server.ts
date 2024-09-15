import { redirect } from "@sveltejs/kit";
import { route } from "$lib/ROUTES";
import { getAllUsers, getUserById } from "$lib/server/user.service";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import * as RoleService from "$lib/server/role.service";
import { getAllCourses } from "$lib/server/course.service";

export const load = (async ({ locals, url, parent }) => {
  await parent();

  const courses = getAllCourses();
  const users = await getAllUsers();
  const user = await getUserById(locals.user?.id as string);

  const tutors = users.filter((user) => user.role?.isTutor);
  if (!user) {
    return;
  }

  if (!user.role) {
    return;
  }

  const { isParent, isStudent, isTutor, isAdmin } = user.role;

  switch (true) {
    case isAdmin:
      throw redirect(302, route("/admin"));
    case isParent:
      throw redirect(302, route("/parent"));
    case isTutor:
      throw redirect(302, route("/tutor"));
    case isStudent:
      throw redirect(302, route("/student"));
    default:
      if (!user.emailVerified?.isEmailVerified) {
        throw redirect(
          302,
          route("/email-verification") + `?redirectTo=${url.pathname}`,
        );
      }
  }

  const userRoleForm = await superValidate(
    zod(ZodValidationSchema.userRoleSchema),
  );

  return { userRoleForm, user, courses, tutors };
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
