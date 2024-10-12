import type { CommunityFeedback } from "@prisma/client";
import db from "../db";

export const createCommunityFeedback = async (
  feedback: Omit<CommunityFeedback, "createdAt">,
) => {
  return await db.communityFeedback.create({
    data: feedback,
    select: {
      id: true,
      name: true,
      occupation: true,
      location: true,
      comment: true,
      createdAt: true,
    },
  });
};

export const getAllCommunityFeedback = async () => {
  return await db.communityFeedback.findMany({
    select: {
      id: true,
      name: true,
      occupation: true,
      location: true,
      image: true,
      comment: true,
      createdAt: true,
    },
  });
};

export const deleteCommunityFeedback = async (id: string) => {
  return await db.communityFeedback.delete({
    where: { id },
  });
};
