<script lang="ts">
  import { route } from "$lib/ROUTES";

  // import type { LayoutData } from './$types';

  import { Navigation } from "$lib/components";
  import { AppShell } from "@skeletonlabs/skeleton";

  // export let data: LayoutData;
  const paths = [
    { name: "home", route: route("/parent") },
    { name: "profile", route: route("/parent/profile") },
    { name: "tutors", route: route("/parent/tutors") },
    { name: "courses", route: route("/parent/courses") },
  ];
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4"
  ><svelte:fragment slot="sidebarLeft"><Navigation {paths} /></svelte:fragment>
  <slot />
</AppShell>
