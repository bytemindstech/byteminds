import { route } from "$lib/ROUTES";
import { getAllCommunityFeedback } from "$lib/server/services/community-feedback.service";
import { getAllInhouseTutors } from "$lib/server/services/inhouse-tutor.service";
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

  const inHouseTutors = getAllInhouseTutors();
  const communityFeedback = getAllCommunityFeedback();
  return {
    meta,
    inHouseTutors,
    communityFeedback,
  };
}) satisfies LayoutServerLoad;
