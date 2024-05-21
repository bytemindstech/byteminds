<script lang="ts">
  import { Footer, Navigation } from "$lib/components";
  import {
    AppShell,
    Drawer,
    Toast,
    getDrawerStore,
    initializeStores,
    storePopup,
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
  import { afterNavigate } from "$app/navigation";
  import type { AfterNavigate } from "@sveltejs/kit";
  import { route } from "$lib/ROUTES";

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

  const drawerClose = () => {
    drawerStore.close();
  };

  const paths = [
    { route: route("/"), name: "home" },
    { route: route("/about"), name: "about" },
    { route: route("/faqs"), name: "faqs" },
  ];
</script>

<Toast />

<Drawer
  ><Navigation {paths} />

  <div class="flex justify-center mt-5">
    <a
      href={route("/register")}
      class="btn btn-lg variant-ghost-tertiary hover:variant-filled-primary"
      on:click={drawerClose}>Register Now</a
    >
  </div>
</Drawer>

<AppShell slotPageFooter="bg-secondary">
  <slot />

  <svelte:fragment slot="pageFooter">
    <Footer year={2024} brand="ByteMinds" />
  </svelte:fragment>
</AppShell>
