<script lang="ts">
  import { getImage } from "$lib/util.client";
  import { onMount } from "svelte";

  import defaultProfile from "$lib/assets/images/default-profile-img.png";

  interface Props {
    data: {
      id: string;
      bio: string;
      name: string;
      subjectTaught: string;
      image: { id: string; key: string; inHouseTutorId: string };
    };
  }

  let { data }: Props = $props();

  const { name, subjectTaught, bio, image } = data;

  let src = $state("");

  const handleImageError = (event: Event) => {
    (event.target as HTMLImageElement).src = defaultProfile;
  };

  onMount(async () => {
    const { url } = (await getImage(image.key)) as ImageResponse;
    src = url;
  });
</script>

<div class="relative mx-auto my-16 max-w-full py-6">
  <div class="overflow-hidden rounded bg-surface-50 shadow-md">
    <div class="absolute inset-x-0 -top-14 flex justify-center">
      <img
        {src}
        class="h-36 w-36 rounded-full object-cover shadow-md outline outline-2 outline-offset-2 outline-primary-400"
        loading="lazy"
        alt="In-House Tutor"
        onerror={handleImageError}
      />
    </div>
    <div class="px-6 pb-5 pt-20 text-center">
      <h1 class="mb-1 text-3xl font-bold">{name}</h1>
      <p class="text-sm text-surface-800">{subjectTaught}</p>
      <p class="pt-3 text-base text-surface-600">{bio}</p>
    </div>
  </div>
</div>
