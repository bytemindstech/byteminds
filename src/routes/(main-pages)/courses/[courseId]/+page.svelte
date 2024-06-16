<script lang="ts">
  import { page } from "$app/stores";
  import { Course } from "$lib/components";
  import { courses, tutors } from "$lib/mock.data";
  // import type { PageData } from './$types';
  
  // export let data: PageData;
  const courseId = $page.params.courseId;

  const getCourse = (id: number) => {
    return courses.find((course) => course.id === id);
  };

  const getCoach = (course: string) => {
    return tutors.find(
      (tutor) => tutor.course.toLowerCase() === course.toLowerCase(),
    );
  };

  const course = getCourse(Number(courseId));
</script>

{#if course}
  <Course
    courseTitle={course.title}
    rate={getCoach(course.title)?.rate}
    description={course.description}
    courseImg={course.imgSrc}
    coach={getCoach(course.title)?.name}
    coachId={getCoach(course.title)?.id}
  />
{/if}
