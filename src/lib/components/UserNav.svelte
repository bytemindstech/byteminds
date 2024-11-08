<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { TabAnchor, TabGroup } from "@skeletonlabs/skeleton";
</script>

<TabGroup
  justify="justify-start"
  active="decoration-primary decoration-4 underline underline-offset-4"
  hover="hover:variant-soft-primary"
  flex="flex-1 lg:flex-none"
  rounded="rounded-full"
  border=""
  spacing=""
  class="bg-surface-100-800-token w-full"
>
  <TabAnchor href={route("classroom")} target="_blank">
    {#snippet lead()}
        Virtual Classroom
      {/snippet}
  </TabAnchor>
</TabGroup>
