<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import { getInitials } from "$lib/util.client";

  import defaultProfile from "$lib/assets/images/default-profile-img.png";

  interface Props {
    name: string;
    profileImage: string;
    email: string;
  }

  let { name, profileImage, email }: Props = $props();

  let initials = $derived(getInitials(name));

  const handleImageError = (event: Event) => {
    (event.target as HTMLImageElement).src = defaultProfile;
  };
</script>

<div class="rounded-lg bg-surface-100 p-6 shadow">
  <div class="flex flex-col items-center">
    <Avatar
      src={profileImage}
      width="w-32"
      background="bg-tertiary-500"
      onerror={handleImageError}
      loading="lazy"
      {initials}
    />
    <h4 class="h4 capitalize">{name}</h4>
    <p class="text-surface-600 md:text-sm">{email}</p>
  </div>
</div>
