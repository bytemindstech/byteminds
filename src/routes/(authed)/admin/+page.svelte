<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  const getUserRole = (role: any): string => {
    if (role.isAdmin) return "Admin";
    if (role.isParent) return "Parent";
    if (role.isStudent) return "Student";
    if (role.isTutor) return "Tutor";
    return "Unknown";
  };
</script>

<div class="container mx-auto p-4">
  <h1 class="h1 mb-6">Admin Dashboard</h1>

  <div class="bg-surface-50 p-4 rounded shadow">
    <h2 class="h2 mb-4">All Users</h2>
    <table class="w-full">
      <thead>
        <tr class="bg-surface-200">
          <th class="p-2 text-left">Name</th>
          <th class="p-2 text-left">Email</th>
          <th class="p-2 text-left">Role</th>
          <th class="p-2 text-left">Last Login</th>
        </tr>
      </thead>
      <tbody>
        {#await data.users}
          <tr>
            <td colspan="4" class="p-2">Loading...</td>
          </tr>
        {:then users}
          {#each users as user}
            <tr class="border-b">
              <td class="p-2">{user.firstName} {user.lastName}</td>
              <td class="p-2">{user.email}</td>
              <td class="p-2">{getUserRole(user.role)}</td>
              <td class="p-2">{user.updatedAt}</td>
            </tr>
          {/each}
        {/await}
      </tbody>
    </table>
  </div>
</div>
