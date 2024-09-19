<script lang="ts">
  import { MyCourse } from "$lib/components";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { resetTitle } from "$lib/util.client";
  import { onDestroy } from "svelte";

  export let data: PageData;

  // Reactive declaration for the courseId
  let courseId: string;
  $: courseId = $page.params.id;

  // Reactive declaration for selected course
  let selectedMyCourse;
  $: selectedMyCourse = data.myCourses.find((course) => course.id === courseId);

  onDestroy(resetTitle);
</script>

<svelte:head><title>{data.title}</title></svelte:head>

{#if selectedMyCourse}
  <MyCourse
    courseTitle={selectedMyCourse.title}
    rate={selectedMyCourse.price}
    description={selectedMyCourse.description}
    courseImg={selectedMyCourse.image}
    {courseId}
    updateCourseFormData={data.updateCourseForm}
    deleteCourseFormData={data.deleteCourseForm}
  />
{/if}
