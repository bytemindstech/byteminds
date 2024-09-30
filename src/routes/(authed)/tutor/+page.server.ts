import { route } from "$lib/ROUTES";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { getUserById } from "$lib/server/user.service";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import * as CourseService from "$lib/server/course.service";
import { generateId } from "lucia";

export const load = (async ({ locals }) => {
  if (!locals.user) {
    return;
  }
  const courseForm = await superValidate(zod(ZodValidationSchema.courseSchema));

  const title =
    "Dashboard - " + `${locals.user.firstName} ${locals.user.lastName}`;

  if (locals.user.role !== "TUTOR") {
    throw redirect(302, route("/user-profile"));
  }

  return { courseForm, title };
}) satisfies PageServerLoad;

export const actions: Actions = {
  addCourse: async ({ request }) => {
    const courseForm = await superValidate(
      request,
      zod(ZodValidationSchema.courseSchema),
    );

    if (!courseForm.valid) {
      return message(courseForm, "invalid form", { status: 406 });
    }

    await CourseService.createCourse({
      id: generateId(15),
      userId: courseForm.data.userId,
      title: courseForm.data.courseTitle,
      price: courseForm.data.price,
      description: courseForm.data.description,
      image: courseForm.data.courseImage,
      rating: "",
    });

    return message(courseForm, "Course added successfully");
  },

  updateCourse: async ({ request }) => {
    const updateCourseForm = await superValidate(
      request,
      zod(ZodValidationSchema.updateCourseSchema),
    );

    if (!updateCourseForm.valid) {
      return message(updateCourseForm, "Invalid form", { status: 406 });
    }

    await CourseService.updateCourse(updateCourseForm.data.courseId, {
      title: updateCourseForm.data.courseTitle,
      price: updateCourseForm.data.price,
      description: updateCourseForm.data.description,
      image: updateCourseForm.data.courseImage,
      updatedAt: new Date(),
    });

    return message(
      updateCourseForm,
      `Successfully updated the ${updateCourseForm.data.courseTitle} course`,
    );
  },
};
