<script lang="ts">
  import { MyCourse } from "$lib/components";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { resetTitle } from "$lib/util.client";
  import { onDestroy, onMount } from "svelte";
  import { route } from "$lib/ROUTES";
  import type { Course } from "@prisma/client";

  export let data: PageData;

  // Reactive declaration for the courseId
  $: courseId = $page.params.id;
  $: isLoading = true;

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

  onDestroy(resetTitle);
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
