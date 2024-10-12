<script lang="ts">
  import { Footer, Metadata, Navigation } from "$lib/components";
  import { paths } from "$lib/util.client";
  import { route } from "$lib/ROUTES";
  import { page } from "$app/stores";
  import { afterNavigate } from "$app/navigation";
  import { ConfirmModal } from "$lib/components/ui";
  import type { AfterNavigate } from "@sveltejs/kit";
  import {
    AppShell,
    Drawer,
    Toast,
    getDrawerStore,
    initializeStores,
    storePopup,
    Modal,
    type ModalComponent,
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
  const drawerClose = () => {
    drawerStore.close();
  };

  const modalRegistry: Record<string, ModalComponent> = {
    confirmModal: { ref: ConfirmModal },
  };

  let meta: Meta;

  page.subscribe(($page) => {
    meta = $page.data.meta; //Restore Page Defaults
  });
</script>

<!-- Metadata for SEO-->
<Metadata {meta} pathname={$page.url.pathname} />

<!-- Overlays -->
<Modal components={modalRegistry} />
<Toast />
<Drawer
  ><Navigation {paths} />

  <div class="flex justify-center mt-5">
    <a
      href={route("/signin-signup") + "?register"}
      class="btn btn-lg variant-filled-tertiary font-bold"
      on:click={drawerClose}>Apply Now</a
    >
  </div>
</Drawer>

<!--App Shell-->
<AppShell slotPageFooter="bg-secondary">
  <slot />

  <svelte:fragment slot="pageFooter">
    <Footer year={new Date().getFullYear()} brand="ByteMinds PH" />
  </svelte:fragment>
</AppShell>
