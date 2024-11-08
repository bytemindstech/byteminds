import { route } from "$lib/ROUTES";
import { redirect } from "@sveltejs/kit";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { generateId } from "lucia";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  BUCKET_NAME,
  S3_ACCESS_KEY_ID,
  S3_REGION,
  S3_SECRET_ACCESS_KEY,
} from "$lib/constants";

import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import * as CourseService from "$lib/server/services/course.service";

import type { Actions, PageServerLoad } from "./$types";

const minIOClient = new S3Client({
  endpoint: "https://minio-gw8go8o0wkkg0cosk08gkw8o.51.79.156.25.sslip.io",
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

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

    // Logic for s3 bucket
    const file = courseForm.data.courseImage as File | null;

    if (!file) {
      return message(courseForm, "No file uploaded", { status: 406 });
    }

    const courseId = generateId(15);
    const fileName = `${courseId}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();
    const fileContent = new Uint8Array(arrayBuffer);

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
    };

    // Send image to Object Storage
    const command = new PutObjectCommand(uploadParams);
    await minIOClient.send(command);

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
