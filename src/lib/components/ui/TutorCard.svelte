<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import { route } from "$lib/ROUTES";
  import { onMount } from "svelte";
  import { getImage, getInitials } from "$lib/util.client";

  import defaultCourseImage from "$lib/assets/images/default-course-img.jpg";
  import VerifiedBadge from "./VerifiedBadge.svelte";

  interface Props {
    courses?: Array<{
      id: string;
      title: string;
      image: { key: string };
    }>;
    name: string;
    avatarImageKey: string;
    verified: boolean;
    id: string;
  }

  let { courses = [], name, avatarImageKey, verified, id }: Props = $props();

  let courseImage = $state("");
  let avatarImage = $state("");
  let initials = $state("");

  const keys =
    courses && courses.length > 0
      ? courses.map((course) => course.image.key)
      : [defaultCourseImage];

  // Safely map over courses and get images, with a fallback

  // Precompute the random image once
  let randomKey = getRandomImageKey(keys);

  function getRandomImageKey(arr: string[]): string {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  // Fallback image handler
  function handleCourseImageError(event: Event) {
    (event.target as HTMLImageElement).src = defaultCourseImage;
  }

  onMount(async () => {
    if (courses && courses.length > 0) {
      const { url } = (await getImage(randomKey)) as ImageResponse;

      courseImage = url;
    }

    const { url } = (await getImage(avatarImageKey)) as ImageResponse;

    avatarImage = url;
    initials = getInitials(name);
  });
</script>

<a
  class="card card-hover flex min-w-[100px] flex-col overflow-hidden"
  href={route("/tutors/[tutorId]", { tutorId: id })}
>
  <header class="relative">
    <img
      src={courseImage}
      width="400"
      height="175"
      class="aspect-[16/9] w-full"
      alt="Course"
      loading="lazy"
      onerror={handleCourseImageError}
    />
  </header>
  <section class="flex flex-col p-4">
    <p class="text-xs font-semibold">Available course:</p>
    <ul class="flex flex-wrap gap-1">
      {#if courses && courses.length > 0}
        {#each courses as course (course.id)}
          <li>
            <span class="variant-filled-primary badge capitalize">
              {course.title || "Untitled Course"}
            </span>
          </li>
        {/each}
      {:else}
        <span class="variant-filled-primary badge capitalize">
          no course available
        </span>
      {/if}
    </ul>
  </section>
  <hr class="my-4 opacity-50" />
  <footer class="card-footer flex items-center space-x-3">
    <Avatar
      src={avatarImage}
      {initials}
      loading="lazy"
      width="w-8"
      background="bg-primary-500"
    />
    <div class="flex flex-1 items-center justify-between">
      <div class="space-y-1">
        <h6 class="h6">{name}</h6>
      </div>
      {#if verified}
        <VerifiedBadge />
      {/if}
    </div>
  </footer>
</a>
