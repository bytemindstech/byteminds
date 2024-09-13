<script lang="ts">
  import { Course } from "$lib/components";
  import type { PageData } from "./$types";

  export let data: PageData;

  // const courseId = data.course?.id;

  // const getCourse = (id: number) => {
  //   return courses.find((course) => course.id === id);
  // };

  // const getCoach = (course: string) => {
  //   return tutors.find(
  //     (tutor) => tutor.course.toLowerCase() === course.toLowerCase(),
  //   );
  // };

  // const course = getCourse(Number(courseId));
</script>

<Course
  courseTitle={data.course?.title}
  rate={data.course?.price}
  description={data.course?.description}
  courseImg={data.course?.image}
  coach={`${data.user?.firstName} ${data.user?.lastName}`}
  coachId={data.course?.userId}
/>
