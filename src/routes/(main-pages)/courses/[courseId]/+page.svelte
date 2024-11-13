<script lang="ts">
  import { CourseProfile } from "$lib/components";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import { getImage } from "$lib/util.client";

  interface Props {
    data: PageData;
  }

  type CourseType = {
    title: string;
    price: number;
    description: string;
    image: { key: string };
  };

  let { data }: Props = $props();

  let title = $state("");
  let courseImage = $state("");
  let user: any = $state();

  let course = $state({
    title: "",
    price: 0,
    description: "",
    image: { key: "" },
  });

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

    const { url } = (await getImage(course.image.key)) as ImageResponse;
    courseImage = url;
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
