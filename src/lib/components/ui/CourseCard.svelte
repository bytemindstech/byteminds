<script lang="ts">
  import { getImage } from "$lib/util.client";
  import { onMount } from "svelte";

  import defaultCourseImg from "$lib/assets/images/default-course-img.jpg";

  interface Props {
    data: Course;
    href: string;
  }

  let { data, href }: Props = $props();

  let src = $state("");

  // Destructuring data for readability
  const { title, price, image } = data;

  // Fallback image handler
  const handleImageError = (event: Event) => {
    (event.target as HTMLImageElement).src = defaultCourseImg;
  };

  onMount(async () => {
    const { url } = (await getImage(image.key)) as ImageResponse;
    src = url;
  });
</script>

<a
  class="card card-hover overflow-hidden"
  {href}
  aria-label={`View details for ${title || "untitled course"}`}
>
  <header>
    <img
      {src}
      alt={`Image for ${title || "untitled course"}`}
      class="aspect-[16/9] w-full object-cover"
      width="500"
      height="281"
      loading="lazy"
      onerror={handleImageError}
    />
  </header>
  <article
    class="flex flex-col items-center justify-between gap-2 p-4 md:flex-row"
  >
    <h6 class="h6 capitalize">
      {title || "Untitled Course"}
    </h6>
    <p class="text-sm">
      Price: <span>Php{price?.toFixed(2) || "N/A"}/hr</span>
    </p>
  </article>
</a>
