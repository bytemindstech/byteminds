<script lang="ts">
  import { CourseGrid } from "$lib/components";
  import { CourseCard } from "$lib/components/ui";
  import { route } from "$lib/ROUTES";
  import { onDestroy, onMount } from "svelte";
  import { resetTitle } from "$lib/util.client";
  import { getCourses } from "$lib/util.client";
  import { page } from "$app/stores";
  import type { ServerResponse } from "@jhenbert/fetch";
  import type { Course } from "@prisma/client";
  import type { PageData } from "./$types";

  export let data: PageData;

  let courses = [] as Course[];
  let response = { status: "loading" } as ServerResponse<Course[], Error>;

  onMount(async () => {
    response = await getCourses();

    if (response.status === "success") {
      courses = response.data;
    }

    if (response.status === "error") {
      console.error("Error fetching courses: ", response.error.message);
    }
  });

  onDestroy(() => resetTitle(data.meta.title));
</script>

<svelte:head><title>{data.title}</title></svelte:head>

<div class="container mx-auto min-h-screen p-6">
  {#if response.status === "loading"}
    <p class="text-lg font-bold">Loading courses please wait....</p>
  {:else if courses.length > 0}
    <CourseGrid {courses}>
      <svelte:fragment slot="course-card" let:course>
        <CourseCard
          data={course}
          href={route("/courses/[courseId]", { courseId: course.id })}
        />
      </svelte:fragment>
    </CourseGrid>
  {:else}
    <p class="text-lg font-bold">No courses available yet, stay tuned.</p>
  {/if}
</div>
