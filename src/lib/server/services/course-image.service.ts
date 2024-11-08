import db from "../db";

export const getImageByCourseId = async (courseId: string) => {
  return await db.courseImage.findFirst({ where: { courseId } });
};

export const updateImageByCourseId = async (courseId: string, key: string) => {
  return await db.courseImage.update({
    where: { courseId },
    data: { key, updatedAt: new Date() },
  });
};
