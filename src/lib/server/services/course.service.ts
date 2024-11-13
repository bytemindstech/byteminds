import db from "../db";
import type { Course, CourseImage } from "@prisma/client";

export const getAllCourses = async () => {
  return await db.course.findMany({
    include: { image: true },
  });
};

export const getCourseById = async (id: string) => {
  return await db.course.findUnique({
    where: { id },
    include: { image: true },
  });
};

/**
 *
 * @param course
 * @param image
 */
export const createCourse = async (
  course: Omit<Course, "createdAt" | "updatedAt">,
  courseImage: Omit<CourseImage, "courseId" | "createdAt" | "updatedAt">,
) => {
  return await db.course.create({
    data: { ...course, image: { create: courseImage } },
    select: {
      id: true,
      userId: true,
      title: true,
      image: true,
      description: true,
      price: true,
      rating: true,
    },
  });
};

/**
 *
 * @param id
 * @param course
 */
export const updateCourse = async (
  id: string,
  course: Omit<Course, "id" | "createdAt" | "userId" | "rating">,
) => {
  return await db.course.update({
    where: { id },
    data: course,
    select: {
      id: true,
      userId: true,
      title: true,
      price: true,
      description: true,
      image: true,
      createdAt: true,
    },
  });
};

export const deleteCourse = async (id: string) => {
  await db.course.delete({ where: { id } });
};
