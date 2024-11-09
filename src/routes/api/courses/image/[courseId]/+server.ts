import { getImageByCourseId } from "$lib/server/services/course-image.service";
import { json } from "@sveltejs/kit";
import { BUCKET_NAME } from "$lib/constants";
import { ObjectStorage } from "$lib/util.sever";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
  const { courseId } = params;
  const objectStorage = new ObjectStorage();

  const image = await getImageByCourseId(courseId);

  const imageUrl = await objectStorage.generatePresignedUrl(
    BUCKET_NAME,
    image?.key,
  );

  return json({ imageUrl: imageUrl });
};
