import { json } from "@sveltejs/kit";
import { BUCKET_NAME } from "$lib/constants";
import { ObjectStorageService } from "$lib/util.sever";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
  const { key } = params;

  const objectStorageService = new ObjectStorageService();
  const url = await objectStorageService.generatePresignedUrl(BUCKET_NAME, key);

  return json({ url });
};
