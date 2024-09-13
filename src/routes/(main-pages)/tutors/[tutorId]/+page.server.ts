import { getAllUsers } from "$lib/server/user.service";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const users = await getAllUsers();

  const tutor = users.find((user) => user.id === params.tutorId);

  return { tutor };
}) satisfies PageServerLoad;
