import { route } from "$lib/ROUTES";
import { redirect } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { generateId } from "lucia";
import { ObjectStorage } from "$lib/util.sever";
import { BUCKET_NAME } from "$lib/constants";

import * as ZodValidationSchema from "$lib/server/validations/zodSchemas";
import * as CourseService from "$lib/server/services/course.service";

import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals, parent }) => {
  await parent();

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

    // Initialized instance of ObjectStorage
    const objectStorage = new ObjectStorage();

    const imageFile = courseForm.data.image as File | null;

    if (!imageFile) {
      return message(courseForm, "No image uploaded", { status: 406 });
    }

    const courseId = generateId(15);
    const fileName = `${courseId}-${imageFile.name}`;
    const arrayBuffer = await imageFile.arrayBuffer();
    const fileContent = new Uint8Array(arrayBuffer);

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
    };

    // Upload image to Object Storage (S3)
    await objectStorage.upload(uploadParams);

    // Send to database
    await CourseService.createCourse(
      {
        id: courseId,
        userId: courseForm.data.userId,
        title: courseForm.data.courseTitle,
        price: courseForm.data.price,
        description: courseForm.data.description,
        rating: "",
      },

      {
        id: generateId(15),
        key: fileName,
      },
    );

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
      updatedAt: new Date(),
    });

    return message(
      updateCourseForm,
      `Successfully updated the ${updateCourseForm.data.courseTitle} course`,
    );
  },
};
