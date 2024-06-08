<script lang="ts">
  import { Navigation } from "$lib/components";
  import { route } from "$lib/ROUTES";
  import Icon from "@iconify/svelte";
  import { AppShell, AppBar, getDrawerStore } from "@skeletonlabs/skeleton";
  import { paths } from "$lib/util.client";

  const drawerStore = getDrawerStore();

  const drawerOpen = () => {
    drawerStore.open({});
  };

  $: positionClasses = $drawerStore.open ? "translate-x[50%]" : "";
</script>

<AppShell
  class="transition-transform {positionClasses}"
  regionPage="relative"
  slotPageHeader="sticky top-0 z-10 md:hidden"
  slotSidebarLeft="bg-surface-700/5 w-0 md:w-64"
>
  <svelte:fragment slot="pageHeader">
    <AppBar>
      <svelte:fragment slot="lead"
        ><span
          ><button class="btn btn-sm" on:click={drawerOpen}
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
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft">
    <Navigation {paths}
      ><svelte:fragment slot="button"
        ><a
          href={route("/signin-signup")}
          class="btn btn-xl variant-filled-tertiary font-bold">Apply Now</a
        ></svelte:fragment
      ></Navigation
    >
  </svelte:fragment>

  <slot />
</AppShell>
