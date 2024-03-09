<script>
  import { page } from "$app/stores";
  import { Navigation, Footer, Join } from "$lib/components";
  import {
    LightSwitch,
    storePopup,
    AppShell,
    AppBar,
    AppRail,
    AppRailAnchor,
  } from "@skeletonlabs/skeleton";
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";

  import "../app.pcss";

  //requirement for popup
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  $: currentPath = $page.url.pathname;
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead"
        ><h2 class="h2">
          <span class="text-primary-800 dark:text-dark-token">Byte</span><span
            class="text-red-700"
            >Minds
          </span>
        </h2>
      </svelte:fragment>
      <Navigation />
      <svelte:fragment slot="trail">
        {#if currentPath !== "/user"}
          <a href="/login" class="btn hover:variant-soft-primary">Login</a>
        {:else}
          <button formaction="?/logout" class="btn hover:variant-soft-primary"
            >Logout</button
          >
        {/if}
        <LightSwitch />
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft"
    ><AppRail class="md:hidden">
      <svelte:fragment slot="lead">
        <AppRailAnchor href="/" selected={currentPath === "/"}
          >Home
        </AppRailAnchor>
        <AppRailAnchor href="/about" selected={currentPath === "/about"}
          >About
        </AppRailAnchor>
        <AppRailAnchor href="/blog" selected={currentPath === "/blog"}
          >Blog
        </AppRailAnchor>
        <AppRailAnchor href="/faqs" selected={currentPath === "/faqs"}
          >FAQs
        </AppRailAnchor>
      </svelte:fragment>
    </AppRail>
  </svelte:fragment>

  <!-- Router Slot -->
  <slot />

  <!-- ---- / ---- -->
  <Join />
  <svelte:fragment slot="pageFooter">
    <Footer year={2024} brand="ByteMinds" />
  </svelte:fragment>
  <!-- (footer) -->
</AppShell>
