import type { InHouseTutor, InHouseTutorImage } from "@prisma/client";
import db from "../db";

export const createInhouseTutor = async (
  inHouseTutor: Omit<InHouseTutor, "createdAt">,
  image: Omit<InHouseTutorImage, "createdAt" | "updatedAt" | "inHouseTutorId">,
) => {
  return await db.inHouseTutor.create({
    data: { ...inHouseTutor, image: { create: image } },
    select: {
      id: true,
      name: true,
      subjectTaught: true,
      bio: true,
    },
  });
};

export const getAllInhouseTutors = async () => {
  return await db.inHouseTutor.findMany({
    include: {
      image: true,
    },
  });
};

export const updateInhouseTutor = async (
  inHouseTutor: Omit<InHouseTutor, "createdAt">,
) => {
  return await db.inHouseTutor.update({
    where: {
      id: inHouseTutor.id,
    },
    data: inHouseTutor,
    select: {
      id: true,
      name: true,
      subjectTaught: true,
      bio: true,
    },
  });
};

export const deleteInhouseTutor = async (id: string) => {
  return await db.inHouseTutor.delete({
    where: {
      id,
    },
  });
};
