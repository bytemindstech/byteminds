<script lang="ts">
  import type { AfterNavigate } from "@sveltejs/kit";
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { MainNav, Footer, Join, UserNav } from "$lib/components";
  import { route } from "$lib/ROUTES";
  import {
    LightSwitch,
    storePopup,
    AppShell,
    AppBar,
    AppRail,
    AppRailAnchor,
    Avatar,
    initializeStores,
    Toast,
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
  import Icon from "@iconify/svelte";

  //global css
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

  initializeStores();
</script>

<Toast />
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
      {#if typeof currentPath === "string" && currentPath !== route("/user") && currentPath !== route("/email-verification")}
        <MainNav />
      {:else}
        <UserNav />
      {/if}
      <svelte:fragment slot="trail">
        <div class="flex items-center justify-end space-x-1">
          {#if typeof currentPath === "string" && currentPath !== route("/user") && currentPath !== route("/email-verification")}
            <a href={route("/login")} class="btn hover:variant-soft-primary"
              >Login</a
            >
          {:else}
            <form method="post" action={route("default /logout")} use:enhance>
              <button class="btn hover:variant-soft-primary">Logout</button>
            </form>
          {/if}
          <a
            href={route("facebook")}
            target="_blank"
            type="button"
            class="btn-icon hover:variant-soft-primary"
            ><Icon icon="bi:facebook" width="20" height="20" /></a
          >
          <a
            href="/"
            target="_blank"
            type="button"
            class="btn-icon hover:variant-soft-primary"
            ><Icon
              icon="entypo-social:youtube-with-circle"
              width="20"
              height="20"
            /></a
          >
          <LightSwitch />
        </div>
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
      {#if typeof currentPath === "string" && currentPath !== route("/user") && currentPath !== route("/email-verification")}
        <AppRailAnchor href={route("/")} selected={currentPath === route("/")}
          >Home
        </AppRailAnchor>
        <AppRailAnchor
          href={route("/about")}
          selected={currentPath === route("/about")}
          >About
        </AppRailAnchor>
        <AppRailAnchor
          href={route("/blog")}
          selected={currentPath === route("/blog")}
          >Blog
        </AppRailAnchor>
      {:else}
        <AppRailAnchor href={route("classroom")} target="_blank"
          >Virtual Classroom</AppRailAnchor
        >
      {/if}
    </AppRail>
  </svelte:fragment>

  <!-- Router Slot -->
  <slot />

  <!-- ---- / ---- -->
  {#if typeof currentPath === "string" && currentPath !== route("/user") && currentPath !== route("/email-verification")}
    <Join />
  {/if}
  <svelte:fragment slot="pageFooter">
    <Footer year={2024} brand="ByteMinds" />
  </svelte:fragment>
  <!-- (footer) -->
</AppShell>
