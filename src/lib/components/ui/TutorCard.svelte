<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import VerifiedBadge from "./VerifiedBadge.svelte";
  import { route } from "$lib/ROUTES";
  import defaultCourseImg from "$lib/assets/images/default-course-img.jpg";
  import { onMount } from "svelte";
  import { getImageUrl } from "$lib/util.client";

  interface Props {
    courses?: Array<{ id: string; title: string }>;
    name: string;
    avatarImg: string;
    verified: boolean;
    id: string;
  }

  let { courses = [], name, avatarImg, verified, id }: Props = $props();
  let src = $state("");

  const courseIds =
    courses && courses.length > 0
      ? courses.map((course) => course.id)
      : [defaultCourseImg];

  // Safely map over courses and get images, with a fallback

  // Precompute the random image once
  let randomCourseId = getRandomCourseId(courseIds);

  function getRandomCourseId(arr: string[]): string {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  // Fallback image handler
  function handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = defaultCourseImg;
  }

  onMount(async () => {
    if (courses && courses.length > 0) {
      const { imageUrl } = await getImageUrl(randomCourseId);
      src = imageUrl;
    }
  });
</script>

<a
  class="card card-hover flex min-w-[100px] flex-col overflow-hidden"
  href={route("/tutors/[tutorId]", { tutorId: id })}
>
  <header class="relative">
    <img
      {src}
      width="400"
      height="175"
      class="aspect-[16/9] w-full"
      alt="tutor"
      loading="lazy"
      onerror={handleImageError}
    />
  </header>
  <section class="flex flex-col p-4">
    <p class="text-xs font-semibold">Available course:</p>
    <ul class="flex flex-wrap gap-1">
      {#if courses && courses.length > 0}
        {#each courses as course (course.id)}
          <li>
            <span class="variant-filled-primary badge capitalize">
              {course.title || "untitled course"}
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
    <Avatar src={avatarImg} width="w-8" />
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
