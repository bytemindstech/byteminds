<script lang="ts">
  import { Navigation } from "$lib/components";
  import { route } from "$lib/ROUTES";
  import { AppShell } from "@skeletonlabs/skeleton";
  //   import type { LayoutData } from "./$types";

  //   export let data: LayoutData;

  const paths = [
    { name: "dashboard", route: route("/tutor") },
    { name: "profile", route: route("/tutor/profile") },
  ];
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-64"
  ><svelte:fragment slot="sidebarLeft"><Navigation {paths} /></svelte:fragment>
  <slot />
</AppShell>
