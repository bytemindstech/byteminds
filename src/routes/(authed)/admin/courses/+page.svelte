<script lang="ts">
  import dateFormatter from "@jhenbert/date-formatter";
  import { dateOption, capitalize } from "$lib/util.client";
  import { onMount } from "svelte";
  import { getCourses } from "$lib/util.client";
  import type { ServerResponse } from "@jhenbert/fetch";
  import type { Course } from "@prisma/client";
  import type { PageData } from "./$types";

  let courses: Course[] = [];
  let response: ServerResponse<Course[], Error> = { status: "loading" };

  export let data: PageData;

  $: getTutor = (userId: string) => {
    return data.users.find((user) => user.id === userId);
  };

  onMount(async () => {
    response = await getCourses();

    if (response.status === "success") {
      courses = response.data;
    }

    if (response.status === "error") {
      console.error("Error while fetching courses: ", response.error.message);
    }
  });
</script>

<div class="container mx-auto p-6">
  <div class="bg-surface-50 p-4 rounded shadow">
    <h3 class="h3 mb-4">Courses</h3>
    {#if response.status === "loading"}
      <p class="text-lg font-bold">Loading courses please wait....</p>
    {:else}
      <table class="w-full">
        <thead>
          <tr class="bg-surface-200">
            {#each ["no.", "title", "tutor", "price", "created on", "updated on"] as th}
              <th class="p-2 text-left">{capitalize(th)}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#if courses.length > 0}
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
                  >{dateFormatter(
                    "en-PH",
                    dateOption,
                    new Date(course.createdAt),
                  )}</td
                >
                <td class="p-2"
                  >{dateFormatter(
                    "en-PH",
                    dateOption,
                    new Date(course.updatedAt),
                  )}</td
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
    {/if}
  </div>
</div>
