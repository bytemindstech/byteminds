<script lang="ts">
  import { CourseProfile } from "$lib/components";
  import { onDestroy, onMount } from "svelte";
  import { resetTitle } from "$lib/util.client";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: title = "ByteMinds PH - Available Courses";

  let course: any;
  let user: any;

  onMount(async () => {
    const users = await data.users;

    const selectedUser = users.find((user) =>
      user.courses.some((course) => course.id === $page.params.courseId),
    );

    if (selectedUser) {
      user = selectedUser;
      course = selectedUser.courses.find(
        (course) => course.id === $page.params.courseId,
      );

      title = `ByteMinds PH - ${course.title}`;
    }
  });

  onDestroy(resetTitle);
</script>

<svelte:head><title>{title}</title></svelte:head>

{#if user && course}
  <CourseProfile
    courseTitle={course.title}
    rate={course.price}
    description={course.description}
    courseImg={course.image}
    coach={`${user.firstName} ${user.lastName}`}
    coachId={user.id}
  />
{/if}
