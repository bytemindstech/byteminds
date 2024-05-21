<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Avatar } from "@skeletonlabs/skeleton";
  import VerifiedBadge from "./verified-badge.svelte";

  export let course;
  export let name;
  export let courseImgSrc;
  export let avatarImgSrc;
  export let rating;
  export let verified;
  export let rate;
</script>

<a class="card card-hover overflow-hidden min-w-[100]" href="/">
  <header>
    <img
      src={courseImgSrc}
      width="400"
      height="175"
      class="bg-black/50 w-full aspect-[16/9]"
      alt="tutor"
    />
  </header>
  <section class="p-4">
    <h5 class="h5">{course}</h5>
    <p class="text-sm text-gray-600">Rate: {rate}/hr</p>
  </section>
  <hr class="opacity-50 mb-4" />
  <footer class="card-footer flex justify-start items-center space-x-3">
    <Avatar src={avatarImgSrc} width="w-8" />
    <div class="flex-auto flex justify-between items-center">
      <div class="flex-auto space-y-1">
        <h6 class="h6">{name}</h6>
        {#if verified}
          <VerifiedBadge />
        {/if}
      </div>
      <div class="flex space-x-1 items-center">
        <Icon icon="fluent-emoji-flat:star" width="1.2em" height="1.2em" />
        <span class="text-xs text-gray-500">{rating}</span>
      </div>
    </div>
  </footer>
</a>
