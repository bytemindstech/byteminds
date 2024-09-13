<script lang="ts">
  import { route } from "$lib/ROUTES";

  export let data: {
    id: string;
    title: string;
    price: number;
    image?: string; // Optional image field
  };

  // Destructuring data for readability
  const { id, title, price, image = "/default-course.jpg" } = data;
</script>

<a
  class="card card-hover overflow-hidden"
  href={route("/courses/[courseId]", { courseId: id })}
  aria-label={`View details for ${title}`}
>
  <header>
    <img
      src={image}
      alt={`Image for ${title}`}
      class="w-full aspect-[16/9]"
      width="500"
      height="100"
      loading="lazy"
    />
  </header>
  <article class="flex justify-between items-center p-4">
    <h5 class="h5 capitalize">{title || "Untitled Course"}</h5>
    <!-- Fallback for title -->
    <p class="text-sm">Price: <span>Php{price?.toFixed(2) || "N/A"}/h</span></p>
    <!-- Fallback for price -->
  </article>
  <hr class="opacity-50" />
</a>
