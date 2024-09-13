import db from "./db";
import type { Course } from "@prisma/client";

export const getAllCourses = async () => {
  return await db.course.findMany({
    select: {
      id: true,
      userId: true,
      title: true,
      image: true,
      description: true,
      price: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getCourseById = async (id: string) => {
  return await db.course.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      title: true,
      image: true,
      description: true,
      price: true,
      rating: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const createCourse = async (
  course: Omit<Course, "createdAt" | "updatedAt">,
) => {
  return await db.course.create({
    data: course,
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

export const deleteCourse = async (id: string) => {
  await db.course.delete({ where: { id } });
};