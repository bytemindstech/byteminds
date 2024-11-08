<script lang="ts">
  import { Navigation } from "$lib/components";
  import Icon from "@iconify/svelte";
  import { AppShell, AppBar, getDrawerStore } from "@skeletonlabs/skeleton";
  import { isSignInStore } from "$lib/store";
  import { onDestroy } from "svelte";
  import { paths } from "$lib/util.client";
  import { goto } from "$app/navigation";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  const drawerStore = getDrawerStore();

  const drawerOpen = () => {
    drawerStore.open({});
  };

  let positionClasses = $derived($drawerStore.open ? "translate-x[50%]" : "");

  let isSignIn = $state(false);

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
  
      <Navigation {paths}
        >{#snippet button()}
            <button
              class="btn btn-lg variant-filled-tertiary font-bold capitalize"
              onclick={handleClick}
              >{#if !isSignIn}
                login
              {:else}
                create account
              {/if}
            </button>
          
          {/snippet}
      </Navigation>
    
  {/snippet}

  {@render children?.()}
</AppShell>
