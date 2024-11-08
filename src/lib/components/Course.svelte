<script lang="ts">
  import defaultCourseImg from "$lib/assets/images/default-course-img.jpg";
  interface Props {
    courseTitle: string;
    rate: number;
    description: string;
    courseImage: string;
    coach: string;
    coachId: string;
  }

  let { courseTitle, rate, description, courseImage, coach, coachId }: Props =
    $props();

  // Fallback image handler
  const handleImageError = (event: Event) => {
    (event.target as HTMLImageElement).src = defaultCourseImg;
  };
</script>

<div class="py-8">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="-mx-4 flex flex-col md:flex-row">
      <div class="px-4 md:flex-1">
        <div class="mb-4 h-[460px] rounded-lg bg-surface-300">
          <img
            class="h-full w-full object-cover"
            src={courseImage}
            alt="course_image"
            loading="lazy"
            onerror={handleImageError}
          />
        </div>
        <div class="-mx-2 mb-4 flex">
          <div class="w-1/2 px-2">
            <button
              class="variant-filled-tertiary btn w-full px-4 py-2 font-bold"
              disabled>Book Now</button
            >
          </div>
          <div class="w-1/2 px-2">
            <button
              class="variant-filled-tertiary btn w-full px-4 py-2 font-bold"
              disabled>Add to Wishlist</button
            >
          </div>
        </div>
      </div>
      <div class="px-4 md:flex-1">
        <h3 class="h3 font-bold text-surface-800">Course Title</h3>
        <p class="mb-4 capitalize text-surface-600">
          {courseTitle}
        </p>
        <div class="mb-4 flex">
          <div class="mr-4">
            <span class="font-bold text-surface-700">Coach:</span>
            <span class="text-surface-600">
              <a href={`/tutors/${coachId}`} class="capitalize hover:underline"
                >{coach}
              </a>
            </span>
          </div>
          <div>
            <span class="font-bold text-surface-700">Price:</span>
            <span class="text-surface-600"
              >Php {rate.toFixed(2) || "N/A"}/hr</span
            >
          </div>
        </div>

        <div>
          <span class="font-bold text-surface-700">Course Description:</span>
          <p class="mt-2 text-sm text-surface-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
