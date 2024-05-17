import type { PageServerLoad } from "./$types";
import { posts } from "./data";

export const load = (async () => {
  return {
    summaries: posts.map((post) => ({
      slug: post.slug,
      title: post.title,
    })),
  };
}) satisfies PageServerLoad;
