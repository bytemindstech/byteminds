<script lang="ts">
  import dateFormatter from "@jhenbert/date-formatter";
  import { dateOption } from "$lib/util.client";

  import type { PageData } from "./$types";
  import { route } from "$lib/ROUTES";

  export let data: PageData;

  $: getTutor = (userId: string) => {
    return data.users.find((user) => user.id === userId);
  };
</script>

<div class="container mx-auto p-4">
  <div class="bg-surface-50 p-4 rounded shadow">
    <h3 class="h3 mb-4">Courses</h3>
    {#await data.courses}
      <p class="text-lg font-bold">Loading courses please wait....</p>
    {:then courses}
      <table class="w-full">
        <thead>
          <tr class="bg-surface-200">
            <th class="p-2 text-left">No.</th>
            <th class="p-2 text-left">Title</th>
            <th class="p-2 text-left">Tutor</th>
            <th class="p-2 text-left">Price</th>
            <th class="p-2 text-left">Created on</th>
            <th class="p-2 text-left">Updated on</th>
          </tr>
        </thead>
        <tbody>
          {#if courses && courses.length > 0}
            {#each courses as course, index (course.id)}
              <tr class="border-b">
                <td class="p-2">{index + 1}</td>
                <td class="p-2 capitalize">{course.title} </td>
                <td class="p-2 capitalize"
                  >{getTutor(course.userId)?.firstName}
                  {getTutor(course.userId)?.lastName}</td
                >
                <td class="p-2">Php{course.price.toFixed(2)}</td>
                <td class="p-2"
                  >{dateFormatter("en-PH", dateOption, course.createdAt)}</td
                >
                <td class="p-2"
                  >{dateFormatter("en-PH", dateOption, course.updatedAt)}</td
                >
              </tr>
            {/each}
          {:else}
            <tr class="border-b"
              ><td colspan="4" class="text-center p-2"
                >No courses available yet</td
              >
            </tr>
          {/if}
        </tbody>
      </table>
    {/await}
  </div>
</div>
