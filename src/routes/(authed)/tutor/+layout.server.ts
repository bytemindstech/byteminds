import { getAllCourses } from "$lib/server/services/course.service";
import { superValidate } from "sveltekit-superforms/server";
import type { LayoutServerLoad, Actions } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";

export const load = (async ({ locals, params }) => {
  const updateCourseForm = await superValidate(
    zod(ZodValidationSchema.updateCourseSchema),
  );

  const allCourses = await getAllCourses();

  const myCourses = allCourses.filter(
    (course) => course.userId === locals.user?.id,
  );

  const course = myCourses.find((course) => course.id === params.id);

  const title = `My Course | ${course?.title}`;

  return { myCourses, updateCourseForm, title };
}) satisfies LayoutServerLoad;
