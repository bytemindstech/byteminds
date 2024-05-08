<script lang="ts">
  import { AppShell } from "@skeletonlabs/skeleton";
  //   import type { LayoutData } from "./$types";

  //   export let data: LayoutData;
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4" slotSidebarRight="bg-surface-500/5 w-56 p-4">
  <svelte:fragment slot="sidebarLeft">left sidebar</svelte:fragment>
  <svelte:fragment slot="sidebarRight">right sidebar</svelte:fragment>
  <slot />
</AppShell>
