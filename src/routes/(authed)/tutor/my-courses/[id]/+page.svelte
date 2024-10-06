<script lang="ts">
  import { MyCourse } from "$lib/components";
  import { page } from "$app/stores";
  import { route } from "$lib/ROUTES";
  import type { Course } from "@prisma/client";
  import type { PageData } from "./$types";
  import { onDestroy, onMount } from "svelte";
  import { resetTitle } from "$lib/util.client";

  export let data: PageData;

  let courseId = $page.params.id;
  let isLoading = true;

  let course: Course;

  const getCourseById = async (id: string) => {
    try {
      const response = await fetch(route("GET /api/courses/[id]", { id }));
      if (!response.ok) {
        console.error("Failed to fetch");
      }

      return await response.json();
    } catch (error) {
      console.error("Error while fetching", (error as Error).message);
    }
  };

  onMount(async () => {
    course = await getCourseById(courseId);
    isLoading = false;
  });

  onDestroy(() => resetTitle(data.meta.title));
</script>

<svelte:head><title>{data.title}</title></svelte:head>

{#if isLoading}
  <p class="text-lg font-bold">Loading course please wait....</p>
{:else}
  <MyCourse
    courseTitle={course.title}
    rate={course.price}
    description={course.description}
    courseImg={course.image}
    {courseId}
    updateCourseFormData={data.updateCourseForm}
  />
{/if}
