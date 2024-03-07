<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";
  import { TabAnchor, TabGroup, popup } from "@skeletonlabs/skeleton";

  import type { PopupSettings } from "@skeletonlabs/skeleton";

  const popupBox: PopupSettings = {
    event: "click",
    target: "popupBox",
    placement: "bottom",
    closeQuery: "li",
  };

  let currentPage = $page.url.pathname;
</script>

<TabGroup
  justify="justify-start"
  active="decoration-primary decoration-4 underline underline-offset-4"
  hover="hover:variant-soft-primary"
  flex="flex-1 lg:flex-none"
  rounded="rounded-full"
  border=""
  spacing=""
  class="bg-surface-100-800-token w-full hidden md:block"
>
  <TabAnchor href="/" selected={currentPage === "/"}>
    <svelte:fragment slot="lead">Home</svelte:fragment>
  </TabAnchor>

  <TabAnchor href="/about" selected={currentPage === "/about"}>
    <svelte:fragment slot="lead">About</svelte:fragment>
  </TabAnchor>

  <button
    class="btn hover:variant-soft-primary w-35 justify-between ms-5"
    use:popup={popupBox}
  >
    <span>Explore</span>
    <span><Icon icon="gravity-ui:caret-down" /></span>
  </button>

  <div class="card w-40 shadow-xl py-2" data-popup="popupBox">
    <nav>
      <ul class="grid-col p-2">
        <li>
          <a
            href="/blog"
            class="btn hover:variant-soft-primary min-w-full rounded-none"
            >Blog</a
          >
        </li>
        <li>
          <a
            href="/faqs"
            class="btn hover:variant-soft-primary min-w-full rounded-none"
            >FAQs</a
          >
        </li>
        <hr class="md:hidden !my-4 border dark:border-surface-500-400-token" />
        <li>
          <a
            href="/register"
            class="btn hover:variant-soft-primary min-w-full rounded-none"
            >Register</a
          >
        </li>
      </ul>
    </nav>

    <div class="arrow bg-surface-100-800-token" />
  </div>
</TabGroup>
