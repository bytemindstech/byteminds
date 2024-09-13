<script lang="ts">
  export let courseTitle;
  export let rate;
  export let description;
  export let courseImg;
  export let coach;
  export let coachId;
</script>

<div class="py-8">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row -mx-4">
      <div class="md:flex-1 px-4">
        <div class="h-[460px] rounded-lg bg-surface-300 mb-4">
          <img
            class="w-full h-full object-cover"
            src={courseImg}
            alt="course_image"
            loading="lazy"
          />
        </div>
        <div class="flex -mx-2 mb-4">
          <div class="w-1/2 px-2">
            <button
              class="btn variant-filled-tertiary w-full py-2 px-4 font-bold"
              >Book Now</button
            >
          </div>
          <div class="w-1/2 px-2">
            <button
              class="btn variant-filled-tertiary w-full py-2 px-4 font-bold"
              >Add to Wishlist</button
            >
          </div>
        </div>
      </div>
      <div class="md:flex-1 px-4">
        <h3 class="h3 font-bold text-surface-800">Course Title</h3>
        <p class="text-surface-600 mb-4 capitalize">
          {courseTitle}
        </p>
        <div class="flex mb-4">
          <div class="mr-4">
            <span class="font-bold text-surface-700">Coach:</span>
            <span class="text-surface-600"
              ><a href={`/tutors/${coachId}`} class="hover:underline capitalize"
                >{coach}</a
              >
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
          <p class="text-surface-600 text-sm mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
