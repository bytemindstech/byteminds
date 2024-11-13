<script lang="ts">
  import { Navigation } from "$lib/components";
  import { route } from "$lib/ROUTES";
  import { AppShell } from "@skeletonlabs/skeleton";

  import type { Snippet } from "svelte";
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  const paths = [
    { name: "dashboard", route: route("/student") },
    { name: "profile", route: route("/student/profile") },
    { name: "available courses", route: route("/student/courses") },
    { name: "freelance tutors", route: route("/student/tutors") },
  ];
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-64"
  >{#snippet sidebarLeft()}
    <Navigation {paths} />
  {/snippet}
  {@render children?.()}
</AppShell>
