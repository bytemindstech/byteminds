<script lang="ts">
  import { Course } from "$lib/components";
  import { onDestroy } from "svelte";
  import type { PageData } from "./$types";
  import { resetTitle } from "$lib/util.client";

  export let data: PageData;

  onDestroy(resetTitle);
</script>

<svelte:head><title>{data.title}</title></svelte:head>

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
