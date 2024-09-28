<script lang="ts">
  import { Navigation } from "$lib/components";
  import { route } from "$lib/ROUTES";

  // import type { LayoutData } from './$types';

  import { AppShell } from "@skeletonlabs/skeleton";

  // export let data: LayoutData;

  const paths = [
    { name: "dashboard", route: route("/student") },
    { name: "profile", route: route("/student/profile") },
    { name: "available courses", route: route("/student/courses") },
    { name: "freelance tutors", route: route("/student/tutors") },
  ];
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-64"
  ><svelte:fragment slot="sidebarLeft"><Navigation {paths} /></svelte:fragment>
  <slot />
</AppShell>
