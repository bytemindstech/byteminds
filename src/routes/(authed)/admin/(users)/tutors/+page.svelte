<script lang="ts">
  import type { PageData } from "./$types";
  import { route } from "$lib/ROUTES";
  import { dateOption, tableheader, capitalize } from "$lib/util.client";
  import dateFormatter from "@jhenbert/date-formatter";
  import { onMount } from "svelte";

  export let data: PageData;

  $: tutors = [] as any;

  onMount(async () => {
    const users = await data.users;
    tutors = users.filter((user) => user.role === "TUTOR");
  });
</script>

<div class="container mx-auto p-6">
  <div class="bg-surface-50 p-4 rounded shadow">
    <h3 class="h3 mb-4">Tutors</h3>
    <table class="w-full">
      <thead>
        <tr class="bg-surface-200">
          {#each tableheader as th}
            <th class="p-2 text-left">{capitalize(th)}</th>
          {/each}
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
                >{tutor.isEmailVerified === "TRUE"
                  ? "verified"
                  : "not verified"}</td
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
