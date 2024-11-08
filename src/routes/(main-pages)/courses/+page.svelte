<script lang="ts">
  import { CourseGrid } from "$lib/components";
  import { CourseCard } from "$lib/components/ui";
  import { route } from "$lib/ROUTES";
  import { onDestroy, onMount } from "svelte";
  import { resetTitle } from "$lib/util.client";
  import { getCourses } from "$lib/util.client";

  import type { ServerResponse } from "@jhenbert/fetch";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let courses = $state([] as Course[]);
  let response = $state({ status: "loading" } as ServerResponse<
    Course[],
    Error
  >);

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
      {#snippet courseCard({ course })}
        <CourseCard
          data={course}
          href={route("/courses/[courseId]", { courseId: course.id })}
        />
      {/snippet}
    </CourseGrid>
  {:else}
    <p class="text-lg font-bold">No courses available yet, stay tuned.</p>
  {/if}
</div>
