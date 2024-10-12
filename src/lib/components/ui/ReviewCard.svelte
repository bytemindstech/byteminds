<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import { DoubleQoute } from "../icons";
  import Icon from "@iconify/svelte";

  export let avatarImg: string;
  export let user: string;
  export let profession: string;
  export let comment: string;
  export let location: string;
</script>

<div
  class="p-8 border border-surface-100 rounded-2xl bg-surface-50 shadow-2xl shadow-tertiary-600/20"
>
  <div class="flex gap-4">
    <Avatar
      src={avatarImg}
      class="w-14"
      initials={user.charAt(0).toUpperCase()}
      background="bg-primary-600"
    />
    <div>
      <h4 class="h4 text-surface-700">{user}</h4>
      <p class="text-sm text-surface-500">{profession}</p>
      <p class="text-xs text-surface-500 italic">
        <span class="flex items-center">
          <Icon icon="raphael:location" />
          {location}
        </span>
      </p>
    </div>
  </div>
  <div class="relative">
    <DoubleQoute />
    <p class="relative mt-8 text-lg text-justify whitespace-normal">
      {comment}
    </p>
  </div>
</div>
