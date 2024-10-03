<script lang="ts">
   export let tutorImg;
  export let bio;
  export let name;
  export let designation;
</script>

<div class="relative mt-16 max-w-sm mx-auto mb-16">
  <div class="rounded overflow-hidden shadow-md bg-surface-50">
    <div class="absolute -mt-20 w-full flex justify-center">
      <div class="h-32 w-32">
        <img
          src={tutorImg}
          class="rounded-full object-cover h-full w-full shadow-md outline outline-offset-2 outline-2 outline-primary-400"
          alt="tutor_image"
        />
      </div>
    </div>
    <div class="px-6 mt-16 pb-5">
      <h1 class="font-bold text-3xl text-center mb-1">{name}</h1>
      <p class="text-surface-800 text-sm text-center">{designation}</p>
      <p class="text-center text-surface-600 text-base pt-3 font-normal">
        {bio}
      </p>
    </div>
  </div>
</div>
