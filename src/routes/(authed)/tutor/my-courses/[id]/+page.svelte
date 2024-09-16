<script lang="ts">
  import { MyCourse } from "$lib/components";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;

  // Reactive declaration for the courseId
  let courseId: string;
  $: courseId = $page.params.id;

  // Reactive declaration for selected course
  let selectedMyCourse;
  $: selectedMyCourse = data.myCourses.find((course) => course.id === courseId);
</script>

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
