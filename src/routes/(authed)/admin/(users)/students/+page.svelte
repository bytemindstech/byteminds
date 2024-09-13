<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { createConnection } from "./notification.store";
  import dateFormatter from "@jhenbert/date-formatter";
  import { dateOption } from "$lib/util.client";
  import { route } from "$lib/ROUTES";

  export let data: PageData;

  // $: currentUserId = data.user ? data.user.id : "";

  // let notificationStore: ReturnType<typeof createConnection>;

  // onMount(() => {
  //   notificationStore = createConnection(currentUserId);

  //   notificationStore.init();

  //   return () => notificationStore.close();
  // });

  const students = data.users.filter((user) => user.role?.isStudent);
</script>

<div class="container mx-auto p-4">
  <div class="bg-surface-50 p-4 rounded shadow">
    <h3 class="h3 mb-4">Students</h3>
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
        {#if students && students.length > 0}
          {#each students as student}
            <tr class="border-b">
              <td class="p-2"
                ><a
                  class="anchor"
                  href={route("/admin/profile/[id]", { id: student.id })}
                  >{student.firstName} {student.lastName}
                </a>
              </td>
              <td class="p-2">{student.email}</td>
              <td class="p-2"
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
