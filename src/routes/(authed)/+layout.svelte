<script lang="ts">
  import { AppShell } from "@skeletonlabs/skeleton";
  //   import type { LayoutData } from "./$types";

  //   export let data: LayoutData;
</script>

<AppShell>
  <svelte:fragment slot="sidebarLeft">sidebar</svelte:fragment>
  <slot />
</AppShell>
