<script lang="ts">
  import type { PageData } from "./$types";
  import { route } from "$lib/ROUTES";
  import { dateOption } from "$lib/util.client";
  import dateFormatter from "@jhenbert/date-formatter";

  export let data: PageData;

  $: tutors = data.users.filter((user) => user.role?.isTutor);
</script>

<div class="container mx-auto p-4">
  <div class="bg-surface-50 p-4 rounded shadow">
    <h3 class="h3 mb-4">Tutors</h3>
    <table class="w-full">
      <thead>
        <tr class="bg-surface-200">
          <th class="p-2 text-left">Name</th>
          <th class="p-2 text-left">Email</th>
          <th class="p-2 text-left">Email Status</th>
          <th class="p-2 text-left">Last Login</th>
        </tr>
      </thead>
      <tbody>
        {#if tutors && tutors.length > 0}
          {#each tutors as tutor}
            <tr class="border-b">
              <td class="p-2 capitalize"
                ><a
                  class="anchor"
                  href={route("/admin/profile/[id]", { id: tutor.id })}
                  >{tutor.firstName} {tutor.lastName}
                </a>
              </td>
              <td class="p-2">{tutor.email}</td>
              <td class="p-2 capitalize"
                >{tutor.emailVerified ? "verified" : "not verified"}</td
              >
              <td class="p-2"
                >{dateFormatter("en-PH", dateOption, tutor.updatedAt)}</td
              >
            </tr>
          {/each}
        {:else}
          <tr class="border-b"
            ><td colspan="4" class="text-center p-2"
              >No tutors registered yet</td
            >
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>
