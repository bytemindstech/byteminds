<script lang="ts">
  import { route } from "$lib/ROUTES";
  import Icon from "@iconify/svelte";
</script>

<div class="mt-8 flex w-full justify-center px-6 py-20">
  <div
    class="rounded-lg bg-surface-100 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg"
  >
    <div class="lg:w-1/2">
      <div
        class="h-80 rounded-b-none border bg-[url('$lib/assets/images/online-teacher.webp')] bg-cover lg:h-full lg:scale-110 lg:rounded-lg"
      ></div>
    </div>

    <div
      class="max-w-xl rounded-t-none border px-6 py-12 lg:w-1/2 lg:max-w-5xl lg:rounded-lg lg:px-12"
    >
      <h2 class="flex items-center justify-start space-x-4 text-3xl font-bold">
        <Icon icon="material-symbols:wifi" width="56" height="56" />
        <span class="text-primary-700">100% Online</span>
      </h2>
      <p class="mt-4 whitespace-normal text-justify text-lg">
        At ByteMinds, we also offer online tutorials for kids and adults on
        different subjects. You can choose your preferred teacher or tutor.
        Would you like to explore our available teachers/tutors as well as the
        subjects we're currently offering?
      </p>
      <div class="mt-8">
        <a
          href={route("/contact-us")}
          class="variant-filled-tertiary btn btn-lg px-5 py-3 font-bold"
          >Inquire Now</a
        >
      </div>
    </div>
  </div>
</div>
