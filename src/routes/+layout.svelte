<script lang="ts">
  import type { AfterNavigate } from "@sveltejs/kit";
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { MainNav, Footer, Join, UserNav } from "$lib/components";
  import {
    LightSwitch,
    storePopup,
    AppShell,
    AppBar,
    AppRail,
    AppRailAnchor,
    Avatar,
  } from "@skeletonlabs/skeleton";
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";
  import logo from "../assets/images/logo.webp";

  import "../app.pcss";

  //requirement for popup
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  $: currentPath = $page.url.pathname;

  //scroll to top on navigation
  afterNavigate((params: AfterNavigate) => {
    const isNewPage = params.from?.url.pathname !== params.to?.url.pathname;
    const elemPage = document.querySelector("#page");
    if (isNewPage && elemPage !== null) {
      elemPage.scrollTop = 0;
    }
  });
</script>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
  <svelte:fragment slot="pageHeader">
    <AppBar>
      <svelte:fragment slot="lead"
        ><h2 class="h2 hidden md:block">
          <span class="text-primary-800 dark:text-dark-token">Byte</span><span
            class="text-red-700"
            >Minds
          </span>
        </h2>
      </svelte:fragment>
      {#if currentPath !== "/user"}
        <MainNav />
      {:else}
        <UserNav />
      {/if}
      <svelte:fragment slot="trail">
        {#if currentPath !== "/user"}
          <a href="/login" class="btn hover:variant-soft-primary">Login</a>
        {:else}
          <form method="post" action="/logout" use:enhance>
            <button class="btn hover:variant-soft-primary">Logout</button>
          </form>
        {/if}
        <LightSwitch />
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft">
    <AppRail class="md:hidden">
      <svelte:fragment slot="lead">
        <div class="flex justify-center mt-3">
          <Avatar src={logo} width="w-14" />
        </div>
      </svelte:fragment>
      {#if currentPath !== "/user"}
        <AppRailAnchor href="/" selected={currentPath === "/"}
          >Home
        </AppRailAnchor>
        <AppRailAnchor href="/about" selected={currentPath === "/about"}
          >About
        </AppRailAnchor>
        <AppRailAnchor href="/blog" selected={currentPath === "/blog"}
          >Blog
        </AppRailAnchor>
      {:else}
        <AppRailAnchor href="https://classroom.jhenbert.com" target="_blank"
          >Virtual Classroom</AppRailAnchor
        >
      {/if}
    </AppRail>
  </svelte:fragment>

  <!-- Router Slot -->
  <slot />

  <!-- ---- / ---- -->
  {#if currentPath !== "/user"}
    <Join />
  {/if}

  <svelte:fragment slot="pageFooter">
    <Footer year={2024} brand="ByteMinds" />
  </svelte:fragment>
  <!-- (footer) -->
</AppShell>
