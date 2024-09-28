<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import VerifiedBadge from "./verified-badge.svelte";
  import { route } from "$lib/ROUTES";
  import defaultCourseImg from "$lib/assets/images/default-course-img.jpg";

  export let courses: Array<{ id: string; title: string; image: string }> = [];
  export let name: string;
  export let avatarImg: string;
  export let verified: boolean;
  export let id: string;

  // Safely map over courses and get images, with a fallback
  const images =
    courses.length > 0
      ? courses.map((course) => course.image)
      : [defaultCourseImg];

  // Precompute the random image once
  let randomImage = getRandomImageSource(images);

  function getRandomImageSource(arr: string[]): string {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  // Fallback image handler
  function handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = defaultCourseImg;
  }
</script>

<a
  class="card card-hover overflow-hidden min-w-[100px] flex flex-col"
  href={route("/tutors/[tutorId]", { tutorId: id })}
>
  <header class="relative">
    <img
      src={randomImage}
      width="400"
      height="175"
      class="w-full aspect-[16/9]"
      alt="tutor"
      loading="lazy"
      on:error={handleImageError}
    />
  </header>
  <section class="p-4 flex flex-col">
    <p class="text-xs font-semibold">Available course:</p>
    <ul class="flex flex-wrap gap-1">
      {#if courses && courses.length > 0}
        {#each courses as course (course.id)}
          <li>
            <span class="badge variant-filled-primary capitalize">
              {course.title || "untitled course"}
            </span>
          </li>
        {/each}
      {:else}
        <span class="badge variant-filled-primary capitalize">
          no course available
        </span>
      {/if}
    </ul>
  </section>
  <hr class="opacity-50 my-4" />
  <footer class="card-footer flex items-center space-x-3">
    <Avatar src={avatarImg} width="w-8" />
    <div class="flex flex-1 justify-between items-center">
      <div class="space-y-1">
        <h6 class="h6">{name}</h6>
      </div>
      {#if verified}
        <VerifiedBadge />
      {/if}
    </div>
  </footer>
</a>
