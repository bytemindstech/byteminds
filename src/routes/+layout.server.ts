import { route } from "$lib/ROUTES";
import type { LayoutServerLoad } from "./$types";

export const load = (async () => {
  //SEO Meta tags
  const metaDefault = {
    title: "ByteMinds PH - Online Tutoring for Academic Excellence",
    description:
      "ByteMinds PH - your trusted partner in online education. Access expert tutoring services anytime, anywhere, and elevate your learning experience.",
    image: `${route("githubAvatar", { avatarId: 159615949 })}`,
  };

  const meta = {
    title: metaDefault.title,
    description: metaDefault.description,
    image: metaDefault.image,

    //Twitter
    twitter: {
      title: metaDefault.title,
      description: metaDefault.description,
      image: metaDefault.image,
    },
  };

  return {
    meta,
  };
}) satisfies LayoutServerLoad;
