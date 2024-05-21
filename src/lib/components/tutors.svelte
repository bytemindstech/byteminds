<script lang="ts">
  // import type { PageData } from './$types';

  import { Tutor } from "$lib/components/ui";

  // export let data: PageData;

  //mock data
  import { tutors } from "$lib/mock.data";
</script>

<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
  {#each tutors as tutor}
    <Tutor
      courseImgSrc={tutor.courseImgSrc}
      avatarImgSrc={tutor.avatarImgSrc}
      course={tutor.course}
      name={tutor.name}
      rate={tutor.rate.toFixed(2)}
      rating={tutor.rating}
      verified={tutor.verified}
    />
  {/each}
</section>
