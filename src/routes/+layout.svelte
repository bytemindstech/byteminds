<script lang="ts">
  import type { AfterNavigate } from "@sveltejs/kit";
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { Footer, Join, UserNav, Navigation } from "$lib/components";
  import { route } from "$lib/ROUTES";
  import Icon from "@iconify/svelte";
  import {
    storePopup,
    AppShell,
    AppBar,
    initializeStores,
    Toast,
    Drawer,
    getDrawerStore,
  } from "@skeletonlabs/skeleton";
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";

  //global css
  import "../app.pcss";

  //requirement for popup
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  //scroll to top on navigation
  afterNavigate((params: AfterNavigate) => {
    const isNewPage = params.from?.url.pathname !== params.to?.url.pathname;
    const elemPage = document.querySelector("#page");
    if (isNewPage && elemPage !== null) {
      elemPage.scrollTop = 0;
    }
  });

  initializeStores();

  const drawerStore = getDrawerStore();

  const drawerOpen = () => {
    drawerStore.open({});
  };

  $: currentPath = $page.url.pathname;

  $: positionClasses = $drawerStore.open ? "translate-x[50%]" : "";

  $: hiddenClass =
    currentPath === route("/students")
      ? "hidden"
      : "" || currentPath === route("/parents")
        ? "hidden"
        : "" || currentPath === route("/tutors")
          ? "hidden"
          : "" || currentPath === route("/admin")
            ? "hidden"
            : "" || currentPath === route("/email-verification")
              ? "hidden"
              : "";

  $: showClass =
    currentPath === route("/students")
      ? ""
      : "md:hidden" && currentPath === route("/parents")
        ? ""
        : "md:hidden" && currentPath === route("/tutors")
          ? ""
          : "md:hidden" && currentPath === route("/admin")
            ? ""
            : "md:hidden" && currentPath === route("/email-verification")
              ? ""
              : "md:hidden";

  $: showLogoutBtn =
    $page.url.pathname === route("/students")
      ? ""
      : "hidden md:block" && currentPath === route("/parents")
        ? ""
        : "hidden md:block" && currentPath === route("/tutors")
          ? ""
          : "hidden md:block" && currentPath === route("/admin")
            ? ""
            : "hidden md:block" && currentPath === route("/email-verification")
              ? ""
              : "hidden md:block";
</script>

<Toast />

<AppShell
  class="transition-transform {positionClasses}"
  regionPage="relative"
  slotPageHeader="sticky top-0 z-10 {showClass}"
  slotSidebarLeft="bg-surface-700/5 w-0 md:w-64 {hiddenClass}"
>
  <Drawer><Navigation /></Drawer>
  <svelte:fragment slot="pageHeader">
    <AppBar>
      <svelte:fragment slot="lead"
        ><span class={hiddenClass}
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

      <UserNav />

      <svelte:fragment slot="trail">
        <div class="items-center justify-end space-x-1 {showLogoutBtn}">
          <form method="post" action={route("default /logout")} use:enhance>
            <button class="btn hover:variant-soft-primary">Logout</button>
          </form>
        </div>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft">
    <Navigation />
  </svelte:fragment>

  <!-- Router Slot -->
  <slot />

  {#if typeof currentPath === "string" && currentPath !== route("/students") && currentPath !== route("/parents") && currentPath !== route("/admin") && currentPath !== route("/email-verification")}
    <Join />
  {/if}

  <!-- (footer) -->
  <svelte:fragment slot="pageFooter">
    <Footer year={2024} brand="ByteMinds" />
  </svelte:fragment>
</AppShell>
