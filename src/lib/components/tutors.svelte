<script lang="ts">
  import { TutorCard } from "$lib/components/ui";
  // import type { PageData } from './$types';
  // export let data: PageData;

  //mock data
  import { tutors, courses } from "$lib/mock.data";

  const getCourse = (courseTitle: string) => {
    return courses.find((course) => course.title === courseTitle);
  };
</script>

<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
  {#each tutors as tutor}
    <TutorCard
      id={tutor.id}
      courseImgSrc={getCourse(tutor.course)?.imgSrc}
      avatarImgSrc={tutor.avatarImgSrc}
      course={tutor.course}
      name={tutor.name}
      rate={tutor.rate.toFixed(2)}
      rating={tutor.rating}
      verified={tutor.verified}
    />
  {/each}
</section>
