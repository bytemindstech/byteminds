<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import { DoubleQoute } from "../icons";

  export let avatarImg;
  export let user;
  export let profession;
  export let comment;
</script>

<div
  class="aspect-auto p-8 border border-surface-100 rounded-2xl bg-surface-50 shadow-2xl shadow-tertiary-600/20"
>
  <div class="flex gap-4">
    <Avatar src={avatarImg} width="w-14" />
    <div>
      <h6 class="text-lg font-medium text-surface-700">
        {user}
      </h6>
      <p class="text-sm text-surface-500">{profession}</p>
    </div>
  </div>
  <div class="relative">
    <DoubleQoute />
    <p class="relative text-justify whitespace-normal mt-8">
      {comment}
    </p>
  </div>
</div>
