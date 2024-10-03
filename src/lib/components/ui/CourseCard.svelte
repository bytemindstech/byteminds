<script lang="ts">
  import defaultCourseImg from "$lib/assets/images/default-course-img.jpg";

  export let data: {
    id: string;
    title: string;
    price: number;
    image?: string; // Optional image field
  };

  export let href;

  // Destructuring data for readability
  const { title, price, image = defaultCourseImg } = data;

  // Fallback image handler
  const handleImageError = (event: Event) => {
    (event.target as HTMLImageElement).src = defaultCourseImg;
  };
</script>

<a
  class="card card-hover overflow-hidden"
  {href}
  aria-label={`View details for ${title || "untitled course"}`}
>
  <header>
    <img
      src={image}
      alt={`Image for ${title || "untitled course"}`}
      class="w-full aspect-[16/9] object-cover"
      width="500"
      height="281"
      loading="lazy"
      on:error={handleImageError}
    />
  </header>
  <article
    class="flex flex-col md:flex-row justify-between items-center p-4 gap-2"
  >
    <h6 class="h6 capitalize">
      {title || "Untitled Course"}
    </h6>
    <p class="text-sm">
      Price: <span>Php{price?.toFixed(2) || "N/A"}/hr</span>
    </p>
  </article>
</a>
