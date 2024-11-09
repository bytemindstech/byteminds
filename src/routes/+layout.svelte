<script lang="ts">
  import { Footer, Metadata, Navigation } from "$lib/components";
  import { paths } from "$lib/util.client";
  import { route } from "$lib/ROUTES";
  import { page } from "$app/stores";
  import { afterNavigate } from "$app/navigation";
  import { ConfirmModal } from "$lib/components/ui";

  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";

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

  import type { AfterNavigate } from "@sveltejs/kit";

  //global css
  import "../app.pcss";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

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

  let meta: Meta | undefined = $state();

  page.subscribe(($page) => {
    meta = $page.data.meta; //Restore Page Defaults
  });
</script>

<!-- Metadata for SEO-->
<Metadata meta={meta as Meta} pathname={$page.url.pathname} />

<!-- Overlays -->
<Modal components={modalRegistry} />
<Toast />
<Drawer
  ><Navigation {paths} />

  <div class="mt-5 flex justify-center">
    <a
      href={route("/signin-signup") + "?register"}
      class="variant-filled-tertiary btn btn-lg font-bold"
      onclick={drawerClose}>Apply Now</a
    >
  </div>
</Drawer>

<!--App Shell-->
<AppShell slotPageFooter="bg-secondary">
  {@render children?.()}

  {#snippet pageFooter()}
    <Footer year={new Date().getFullYear()} brand="ByteMinds PH" />
  {/snippet}
</AppShell>
