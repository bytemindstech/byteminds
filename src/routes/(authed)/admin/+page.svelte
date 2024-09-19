<script lang="ts">
  import type { PageData } from "./$types";
  import dateFormatter from "@jhenbert/date-formatter";
  import { dateOption } from "$lib/util.client";

  export let data: PageData;

  $: getUserRole = (role: any): string => {
    switch (true) {
      case role.isAdmin:
        return "admin";
      case role.isTutor:
        return "tutor";
      case role.isParent:
        return "parent";
      case role.isStudent:
        return "student";
      default:
        return "no role";
    }
  };
</script>

<div class="container mx-auto p-6">
  <div class="bg-surface-50 p-4 rounded shadow">
    <h3 class="h3 mb-4">All Users</h3>
    <table class="w-full">
      <thead>
        <tr class="bg-surface-200">
          <th class="p-2 text-left">Name</th>
          <th class="p-2 text-left">Email</th>
          <th class="p-2 text-left">Email Status</th>
          <th class="p-2 text-left">Role</th>
          <th class="p-2 text-left">Last Login</th>
        </tr>
      </thead>
      <tbody>
        {#each data.users as user}
          <tr class="border-b">
            <td class="p-2 capitalize">{user.firstName} {user.lastName}</td>
            <td class="p-2">{user.email}</td>
            <td class="p-2 capitalize"
              >{user.emailVerified ? "verified" : "not verified"}</td
            >
            <td class="p-2 capitalize">{getUserRole(user.role)}</td>
            <td class="p-2"
              >{dateFormatter("en-PH", dateOption, user.updatedAt)}</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
