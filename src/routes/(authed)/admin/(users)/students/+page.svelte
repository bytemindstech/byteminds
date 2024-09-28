<script lang="ts">
  import type { PageData } from "./$types";
  import dateFormatter from "@jhenbert/date-formatter";
  import { dateOption, tableheader, capitalize } from "$lib/util.client";
  import { route } from "$lib/ROUTES";
  import { onMount } from "svelte";

  export let data: PageData;

  $: students = [] as any;

  onMount(async () => {
    const users = await data.users;
    students = users.filter((user) => user.role?.isStudent);
  });
</script>

<div class="container mx-auto p-6">
  <div class="bg-surface-50 p-4 rounded shadow">
    <h3 class="h3 mb-4">Students</h3>
    <table class="w-full">
      <thead>
        <tr class="bg-surface-200">
          {#each tableheader as th}
            <th class="p-2 text-left">{capitalize(th)}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#if students && students.length > 0}
          {#each students as student}
            <tr class="border-b">
              <td class="p-2 capitalize"
                ><a
                  class="anchor"
                  href={route("/admin/profile/[id]", { id: student.id })}
                  >{student.firstName} {student.lastName}
                </a>
              </td>
              <td class="p-2">{student.email}</td>
              <td class="p-2 capitalize"
                >{student.emailVerified ? "verified" : "not verified"}</td
              >
              <td class="p-2"
                >{dateFormatter("en-PH", dateOption, student.updatedAt)}</td
              >
            </tr>
          {/each}
        {:else}
          <tr class="border-b"
            ><td colspan="4" class="text-center p-2"
              >No students registered yet</td
            >
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>
