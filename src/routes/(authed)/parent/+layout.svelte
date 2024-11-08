<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { Navigation } from "$lib/components";
  import { AppShell } from "@skeletonlabs/skeleton";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  const paths = [
    { name: "dashboard", route: route("/parent") },
    { name: "profile", route: route("/parent/profile") },
    { name: "available courses", route: route("/parent/courses") },
    { name: "freelance tutors", route: route("/parent/tutors") },
  ];
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-64"
  >{#snippet sidebarLeft()}
    <Navigation {paths} />
  {/snippet}
  {@render children?.()}
</AppShell>
