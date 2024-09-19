<script lang="ts">
  import { CourseGrid } from "$lib/components";
  import { CourseCard } from "$lib/components/ui";
  import { route } from "$lib/ROUTES";
  import { onDestroy } from "svelte";
  import type { PageData } from "./$types";
  import { resetTitle } from "$lib/util.client";

  export let data: PageData;

  onDestroy(resetTitle);
</script>

<svelte:head><title>ByteMinds PH - Available Courses</title></svelte:head>

<div class="container mx-auto min-h-screen p-6">
  {#await data.courses}
    <p class="text-lg font-bold">Loading courses please wait....</p>
  {:then courses}
    {#if courses && courses.length > 0}
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
  {/await}
</div>
