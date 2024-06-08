<script lang="ts">
  import { route } from "$lib/ROUTES";

  export let name: string;
  export let imgSrc: string;
  export let position: string;
  export let designation: string;
</script>

<div
  class="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-primary-400"
>
  <div class="relative">
    <img class="w-full h-48 object-cover" src={imgSrc} alt="profileImage" />
  </div>
  <div class="px-5 py-2">
    <div class="font-semibold text-surface-800">{name}</div>
    <p class="text-surface-600 text-sm">{position}</p>
  </div>
  <div class="px-5 py-2">
    <span
      class="inline-block px-2 py-1 font-semibold bg-tertiary-800 rounded-full text-surface-100 text-sm"
      >{designation}</span
    >
  </div>
  <div class="px-5 py-2">
    <a
      href={route("/")}
      class="text-tertiary-600 text-sm hover:underline"
      target="_blank">View Profile</a
    >
  </div>
</div>
