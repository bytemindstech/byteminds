<script lang="ts">
  import { Course } from "$lib/components";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if data.course && data.user}
  <Course
    courseTitle={data.course.title}
    rate={data.course.price}
    description={data.course.description}
    courseImg={data.course.image}
    coach={`${data.user.firstName} ${data.user.lastName}`}
    coachId={data.course.userId}
  />
{/if}
