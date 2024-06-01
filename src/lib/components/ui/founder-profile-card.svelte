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
    <div class="text-xl font-semibold text-gray-800">{name}</div>
    <p class="text-gray-600">{position}</p>
  </div>
  <div class="px-5 py-2">
    <span
      class="inline-block px-2 py-1 font-semibold bg-indigo-200 rounded-full"
      >{designation}</span
    >
  </div>
  <div class="px-5 py-2">
    <a
      href={route("/")}
      class="text-primary-500 hover:underline"
      target="_blank">View Profile</a
    >
  </div>
</div>
