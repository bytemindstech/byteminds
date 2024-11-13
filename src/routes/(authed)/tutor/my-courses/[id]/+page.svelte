<script lang="ts">
  import { MyCourse } from "$lib/components";
  import { page } from "$app/stores";
  import { route } from "$lib/ROUTES";
  import { onDestroy, onMount } from "svelte";
  import { getImage, resetTitle } from "$lib/util.client";

  import type { Course, CourseImage } from "@prisma/client";
  import type { PageData } from "./$types";

  interface MyCourseType extends Course {
    image: CourseImage;
  }
  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let courseId = $page.params.id;
  let courseImage = $state("");
  let isLoading = $state(true);
  let course = $state() as MyCourseType;

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

    const { url } = (await getImage(course?.image.key)) as ImageResponse;

    courseImage = url;
    isLoading = false;
  });

  onDestroy(() => resetTitle(data.meta.title));
</script>

<svelte:head><title>{data.title}</title></svelte:head>

{#if isLoading}
  <p class="text-lg font-bold">Loading course please wait....</p>
{:else if course}
  <MyCourse
    courseTitle={course.title}
    rate={course.price}
    description={course.description}
    {courseImage}
    {courseId}
    updateCourseFormData={data.updateCourseForm}
  />
{/if}
