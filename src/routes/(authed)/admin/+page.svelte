<script lang="ts">
  import type { PageData } from "./$types";
  import { dateOption, capitalize } from "$lib/util.client";
  import { match } from "ts-pattern";
  import dateFormatter from "@jhenbert/date-formatter";
  import type { Role } from "@prisma/client";

  export let data: PageData;

  $: getUserRole = (role: Role | null) => {
    if (role) {
      return match(role)
        .with("ADMIN", () => "admin")
        .with("TUTOR", () => "tutor")
        .with("PARENT", () => "parent")
        .with("STUDENT", () => "student")
        .otherwise(() => "user");
    }
  };
</script>

<div class="container mx-auto p-6">
  <div class="bg-surface-50 p-4 rounded shadow">
    <h3 class="h3 mb-4">All Users</h3>
    <table class="w-full">
      <thead>
        <tr class="bg-surface-200">
          {#each ["name", "email", "email status", "role", "last login"] as th}
            <th class="p-2 text-left">{capitalize(th)}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#if data.users && data.users.length > 0}
          {#each data.users as user}
            {#if user.role !== "ADMIN"}
              <tr class="border-b">
                <td class="p-2 capitalize">{user.firstName} {user.lastName}</td>
                <td class="p-2">{user.email}</td>
                <td class="p-2 capitalize"
                  >{user.isEmailVerified === "TRUE"
                    ? "verified"
                    : "not verified"}</td
                >
                <td class="p-2 capitalize">{getUserRole(user.role)}</td>
                <td class="p-2"
                  >{dateFormatter("en-PH", dateOption, user.updatedAt)}</td
                >
              </tr>
            {/if}
          {/each}
        {:else}
          <tr class="border-b"
            ><td colspan="5" class="text-center p-2"
              >No tutors registered yet</td
            >
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>
