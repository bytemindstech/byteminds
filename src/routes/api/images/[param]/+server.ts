import { json } from "@sveltejs/kit";
import { BUCKET_NAME } from "$lib/constants";

import type { RequestHandler } from "./$types";
import { ObjectStorage } from "$lib/util.sever";

export const GET: RequestHandler = async ({ params }) => {
  const { param } = params;

  const objectStorage = new ObjectStorage();
  const url = await objectStorage.generatePresignedUrl(BUCKET_NAME, param);

  return json({ url });
};
