<script lang="ts">
  import { CourseGrid } from "$lib/components";
  import { CourseCard } from "$lib/components/ui";
  import { route } from "$lib/ROUTES";

  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="container mx-auto p-6">
  {#await data.courses}
    <p class="text-lg font-bold">Loading courses please wait....</p>
  {:then courses}
    {#if courses && courses.length > 0}
      <CourseGrid {courses}
        ><svelte:fragment slot="course-card" let:course>
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
