<script lang="ts">
  import { route } from "$lib/ROUTES";
  import Icon from "@iconify/svelte";
</script>

<div class="px-2 py-20 w-full flex justify-center">
  <div class="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg rounded-lg">
    <div class="lg:w-1/2">
      <div
        class="lg:scale-110 h-80 bg-cover lg:h-full rounded-b-none border lg:rounded-lg bg-[url('$lib/assets/images/online-teacher.jpg')]"
      ></div>
    </div>

    <div
      class="py-12 px-6 lg:px-12 max-w-xl lg:max-w-5xl lg:w-1/2 rounded-t-none border lg:rounded-lg"
    >
      <h2 class="flex justify-start items-center text-3xl font-bold space-x-4">
        <Icon icon="material-symbols:wifi" width="56" height="56" />
        <span class="text-primary-700">100% Online</span>
      </h2>
      <p class="mt-4 text-lg text-justify whitespace-normal">
        At ByteMinds, we also offer online tutorials for kids and adults on
        different subjects. You can choose your preferred teacher or tutor.
        Would you like to explore our available teachers/tutors as well as the
        subjects we're currently offering?
      </p>
      <div class="mt-8">
        <a
          href={route("/contact-us")}
          class="btn btn-lg variant-filled-primary px-5 py-3 font-semibold"
          >Inquire Now</a
        >
      </div>
    </div>
  </div>
</div>
