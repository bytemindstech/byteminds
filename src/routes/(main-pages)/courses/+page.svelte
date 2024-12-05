<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { CourseGrid } from "$lib/components";
  import { CourseCard } from "$lib/components/ui";
  import { route } from "$lib/ROUTES";
  import { getCourses } from "$lib/util.client";

  import type { Writable } from "svelte/store";
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

  // const title = getContext<Writable<string>>("title");
  // title.set(data.title);

  onMount(async () => {
    response = await getCourses();

    if (response.status === "success") {
      courses = response.data;
    }

    if (response.status === "error") {
      console.error("Error fetching courses: ", response.error.message);
    }
  });
</script>

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
