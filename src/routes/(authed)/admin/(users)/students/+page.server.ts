import { getAllUsers } from "$lib/server/user.service";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
  const users = getAllUsers();
  return {
    user: locals.user,
    users,
  };
};
