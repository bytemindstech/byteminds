<script lang="ts">
  import { CourseProfile } from "$lib/components";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { getImageUrl } from "$lib/util.client";

  interface Props {
    data: PageData;
  }

  type CourseType = {
    title: string;
    price: number;
    description: string;
  };

  let { data }: Props = $props();

  let title = $state("");
  let courseImage = $state("");
  let course = $state({ title: "", price: 0, description: "" });
  let user: any = $state();

  onMount(async () => {
    const users = await data.users;

    const selectedUser = users.find((user) =>
      user.courses.some((course) => course.id === $page.params.courseId),
    );

    if (selectedUser) {
      user = selectedUser;
      course = selectedUser.courses.find(
        (course) => course.id === $page.params.courseId,
      ) as CourseType;

      title = "Available Course | " + course.title;
    }
  });

  onMount(async () => {
    const { imageUrl } = await getImageUrl($page.params.courseId);
    courseImage = imageUrl;
  });
</script>

<svelte:head><title>{title}</title></svelte:head>

{#if user && course}
  <CourseProfile
    courseTitle={course.title}
    rate={course.price}
    description={course.description}
    {courseImage}
    coach={`${user.firstName} ${user.lastName}`}
    coachId={user.id}
  />
{/if}
