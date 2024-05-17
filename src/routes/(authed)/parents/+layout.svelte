<script lang="ts">
  // import type { LayoutData } from './$types';

  import { AppShell } from "@skeletonlabs/skeleton";

  // export let data: LayoutData;
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4"
  ><svelte:fragment slot="sidebarLeft">Parents Left sidebar</svelte:fragment>
  <slot />
</AppShell>
