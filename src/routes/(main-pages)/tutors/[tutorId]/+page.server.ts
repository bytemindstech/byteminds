import { getAllUsers } from "$lib/server/user.service";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const users = await getAllUsers();
  const tutor = users.find((user) => user.id === params.tutorId);
  const title =
    "ByteMinds PH Tutor | " + `${tutor?.firstName} ${tutor?.lastName}`;

  return { tutor, title };
}) satisfies PageServerLoad;
