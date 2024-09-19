import { getAllCourses } from "$lib/server/course.service";
import { superValidate } from "sveltekit-superforms/server";
import type { LayoutServerLoad, Actions } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";

export const load = (async ({ locals, params }) => {
  const updateCourseForm = await superValidate(
    zod(ZodValidationSchema.updateCourseSchema),
  );

  const deleteCourseForm = await superValidate(
    zod(ZodValidationSchema.deleteCourseSchema),
  );

  const allCourses = await getAllCourses();

  const myCourses = allCourses.filter(
    (course) => course.userId === (locals.user?.id as string),
  );

  const course = myCourses.filter((course) => course.id === params.id);

  const title = `My Course | ${course.map((course) => course.title)}`;
  return { myCourses, updateCourseForm, deleteCourseForm, title };
}) satisfies LayoutServerLoad;
