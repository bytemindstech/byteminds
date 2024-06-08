<script lang="ts">
  import { page } from "$app/stores";
  import { courses } from "$lib/mock.data";
  // import type { PageData } from './$types';
  // export let data: PageData;
  const courseId = $page.params.courseId;

  const getCourse = (id: number) => {
    return courses.find((course) => course.id === id);
  };

  const course = getCourse(Number(courseId));
</script>

<div
  class="container mx-auto min-h-screen flex justify-center items-center py-8"
>
  <div class="px-4">
    <h2 class="h2">Subject: {course?.title}</h2>
    <p class="text-surface-600">{course?.description}</p>
  </div>
</div>
