import type { InHouseTutor } from "@prisma/client";
import db from "../db";

export const createInhouseTutor = async (
  inHouseTutor: Omit<InHouseTutor, "createdAt">,
) => {
  return await db.inHouseTutor.create({
    data: inHouseTutor,
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
    select: {
      id: true,
      name: true,
      subjectTaught: true,
      bio: true,
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
      image: true,
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
