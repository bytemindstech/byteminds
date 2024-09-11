import { getAllUsers } from "$lib/server/user.service";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ parent }) => {
  await parent();

  const users = await getAllUsers();

  return { users };
}) satisfies LayoutServerLoad;
