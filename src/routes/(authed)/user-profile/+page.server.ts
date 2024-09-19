import { redirect } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { match } from "ts-pattern";
import { route } from "$lib/ROUTES";
import { getAllUsers, getUserById } from "$lib/server/user.service";
import { getAllCourses } from "$lib/server/course.service";
import type { Actions, PageServerLoad } from "./$types";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import * as RoleService from "$lib/server/role.service";

export const load = (async ({ locals, url, parent }) => {
  await parent();

  const courses = getAllCourses();
  const users = await getAllUsers();
  const user = await getUserById(locals.user?.id as string);

  const tutors = users.filter((user) => user.role?.isTutor);

  if (!user?.role) {
    return;
  }

  const { isParent, isStudent, isTutor, isAdmin } = user.role;

  const redirectTo = () => {
    return match({ isParent, isStudent, isTutor, isAdmin }) // alternative for switch statement of if-else
      .with({ isAdmin: true }, () => route("/admin"))
      .with({ isParent: true }, () => route("/parent"))
      .with({ isTutor: true }, () => route("/tutor"))
      .with({ isStudent: true }, () => route("/student"))
      .otherwise(() => {
        if (!user.emailVerified?.isEmailVerified) {
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
