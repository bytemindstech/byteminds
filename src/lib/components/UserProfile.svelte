<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import { getInitials } from "$lib/util.client";

  interface Props {
    name: string;
    profileImg: string;
    email: string;
  }

  let { name, profileImg, email }: Props = $props();

  let initials = $derived(getInitials(name));
</script>

<div class="bg-surface-100 shadow rounded-lg p-6">
  <div class="flex flex-col items-center">
    <Avatar
      src={profileImg}
      width="w-32"
      background="bg-tertiary-500"
      {initials}
    />
    <h4 class="h4 capitalize">{name}</h4>
    <p class="text-surface-600 md:text-sm">{email}</p>
  </div>
</div>
