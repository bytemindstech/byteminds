<script lang="ts">
  import { CourseGrid } from "$lib/components";
  import { CourseCard } from "$lib/components/ui";
  import { route } from "$lib/ROUTES";
  import { onMount } from "svelte";
  import { getCourses } from "$lib/util.client";
  import type { Course } from "@prisma/client";
  import type { ServerResponse } from "@jhenbert/fetch";

  $: courses = [] as Course[];
  $: response = { status: "loading" } as ServerResponse<Course[], Error>;

  onMount(async () => {
    response = await getCourses();

    if (response.status === "success") {
      courses = response.data;
    }

    if (response.status === "error") {
      console.error(
        "Error encountered while fetching courses: ",
        response.error.message,
      );
    }
  });
</script>

<div class="container mx-auto p-6">
  {#if response.status === "loading"}
    <p class="text-lg font-bold">Loading courses please wait....</p>
  {:else if courses.length > 0}
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
</div>
