<script lang="ts">
  export let tutorImg;
  export let bio;
  export let name;
  export let designation;
</script>

<div class="relative max-w-full mx-auto my-16 py-6">
  <div class="rounded overflow-hidden shadow-md bg-surface-50">
    <div class="absolute inset-x-0 -top-14 flex justify-center">
      <img
        src={tutorImg}
        class="h-36 w-36 rounded-full object-cover shadow-md outline outline-2 outline-offset-2 outline-primary-400"
        alt="tutor_image"
      />
    </div>
    <div class="px-6 pt-20 pb-5 text-center">
      <h1 class="font-bold text-3xl mb-1">{name}</h1>
      <p class="text-surface-800 text-sm">{designation}</p>
      <p class="text-surface-600 text-base pt-3">{bio}</p>
    </div>
  </div>
</div>
