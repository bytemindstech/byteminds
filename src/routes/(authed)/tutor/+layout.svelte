<script lang="ts">
  import { Navigation } from "$lib/components";
  import { route } from "$lib/ROUTES";
  import { AppShell } from "@skeletonlabs/skeleton";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  const paths = [
    { name: "dashboard", route: route("/tutor") },
    { name: "profile", route: route("/tutor/profile") },
  ];
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-64"
  >{#snippet sidebarLeft()}
    <Navigation {paths} />
  {/snippet}
  {@render children?.()}
</AppShell>
