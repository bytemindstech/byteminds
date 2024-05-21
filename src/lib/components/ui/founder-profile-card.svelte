<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";

  export let name: string;
  export let imgSrc: string;
  export let position: string;
  export let designation: string;
</script>

<div class="card card-hover p-7">
  <div class="flex flex-col items-center justify-center">
    <h6 class="h6 mb-2">{name}</h6>
    <Avatar src={imgSrc} width="w-[200px]" />
    <h5 class="h5 mt-2">{position}</h5>
    <p class="text-sm">{designation}</p>
  </div>
</div>
