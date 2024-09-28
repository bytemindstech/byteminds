<script lang="ts">
  import { Navigation } from "$lib/components";
  import Icon from "@iconify/svelte";
  import { AppShell, AppBar, getDrawerStore } from "@skeletonlabs/skeleton";
  import { isSignInStore } from "$lib/store";
  import { onDestroy } from "svelte";
  import { paths } from "$lib/util.client";
  import { goto } from "$app/navigation";

  const drawerStore = getDrawerStore();

  const drawerOpen = () => {
    drawerStore.open({});
  };

  $: positionClasses = $drawerStore.open ? "translate-x[50%]" : "";

  $: isSignIn = false;

  const handleClick = () => {
    isSignIn = !isSignIn;
    //update the value in svelte store
    isSignInStore.update((value) => !value);

    if (!isSignIn) {
      goto("signin-signup?register");
    } else {
      goto("signin-signup?login");
    }
  };

  onDestroy(() => {
    isSignInStore.set(false);
  });
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
        ><button
          class="btn btn-lg variant-filled-tertiary font-bold capitalize"
          on:click={handleClick}
          >{#if !isSignIn}
            login
          {:else}
            create account
          {/if}
        </button>
      </svelte:fragment>
    </Navigation>
  </svelte:fragment>

  <slot />
</AppShell>
