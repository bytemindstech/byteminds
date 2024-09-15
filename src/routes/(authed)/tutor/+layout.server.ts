import { getAllCourses } from "$lib/server/course.service";
import { superValidate } from "sveltekit-superforms/server";
import type { LayoutServerLoad, Actions } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";

export const load = (async ({ locals }) => {
  const updateCourseForm = await superValidate(
    zod(ZodValidationSchema.updateCourseSchema),
  );

  const allCourses = await getAllCourses();

  const myCourses = allCourses.filter(
    (course) => course.userId === (locals.user?.id as string),
  );
  return { myCourses, updateCourseForm };
}) satisfies LayoutServerLoad;
