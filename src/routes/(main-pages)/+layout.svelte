<script lang="ts">
  import { Navigation } from "$lib/components";
  import { route } from "$lib/ROUTES";
  import { paths } from "$lib/util.client";
  import Icon from "@iconify/svelte";
  import {
    AppShell,
    AppBar,
    getDrawerStore,
    Avatar,
  } from "@skeletonlabs/skeleton";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  const drawerStore = getDrawerStore();

  const drawerOpen = () => {
    drawerStore.open({});
  };

  let positionClasses = $derived($drawerStore.open ? "translate-x[50%]" : "");
</script>

<AppShell
  class="transition-transform {positionClasses}"
  regionPage="relative"
  slotPageHeader="sticky top-0 z-10 md:hidden"
  slotSidebarLeft="bg-surface-700/5 w-0 md:w-64"
>
  {#snippet pageHeader()}
    <AppBar>
      {#snippet lead()}
        <span
          ><button class="btn btn-sm" onclick={drawerOpen}
            ><Icon
              icon="icon-park-outline:hamburger-button"
              width="48"
              height="48"
            /></button
          ></span
        >

        <h2 class="h2">
          <span class="text-primary-800 dark:text-dark-token">Byte</span><span
            class="text-red-700"
            >Minds
          </span>
        </h2>
      {/snippet}
    </AppBar>
  {/snippet}

  {#snippet sidebarLeft()}
    <div class="mt-4 flex justify-center p-4">
      <Avatar
        src={route("githubAvatar", { avatarId: 159615949 })}
        width="w-20 md:w-32"
      />
    </div>
    <Navigation {paths}>
      {#snippet button()}
        <a
          href={route("/signin-signup") + "?register"}
          class="variant-filled-tertiary btn btn-xl font-bold"
          >Apply Now <br />(Early Access)</a
        >
      {/snippet}
    </Navigation>
  {/snippet}

  {@render children?.()}
</AppShell>
