<script lang="ts">
  import dateFormatter from "@jhenbert/date-formatter";
  import type { PageData } from "./$types";
  import { dateOption, tableheader, capitalize } from "$lib/util.client";
  import { route } from "$lib/ROUTES";
  import { onMount } from "svelte";

  export let data: PageData;

  $: parents = [] as any;

  onMount(async () => {
    const users = await data.users;
    parents = users.filter((user) => user.role?.isParent);
  });
</script>

<div class="container mx-auto p-6">
  <div class="bg-surface-50 p-4 rounded shadow">
    <h3 class="h3 mb-4">Parents</h3>
    <table class="w-full">
      <thead>
        <tr class="bg-surface-200">
          {#each tableheader as th}
            <th class="p-2 text-left">{capitalize(th)}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#if parents && parents.length > 0}
          {#each parents as parent}
            <tr class="border-b">
              <td class="p-2 capitalize"
                ><a
                  class="anchor"
                  href={route("/admin/profile/[id]", { id: parent.id })}
                  >{parent.firstName} {parent.lastName}
                </a>
              </td>
              <td class="p-2">{parent.email}</td>
              <td class="p-2 capitalize"
                >{parent.emailVerified ? "verified" : "not verified"}</td
              >
              <td class="p-2"
                >{dateFormatter("en-PH", dateOption, parent.updatedAt)}</td
              >
            </tr>
          {/each}
        {:else}
          <tr class="border-b"
            ><td colspan="4" class="text-center p-2"
              >No parents registered yet</td
            >
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>
