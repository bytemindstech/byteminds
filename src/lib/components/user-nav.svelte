<script lang="ts">
  import { page } from "$app/stores";
  import { TabAnchor, TabGroup } from "@skeletonlabs/skeleton";

  import type { PopupSettings } from "@skeletonlabs/skeleton";

  const popupBox: PopupSettings = {
    event: "click",
    target: "popupBox",
    placement: "bottom",
    closeQuery: "li",
  };

  //sugarcoat variable to be reactive
  $: currentPage = $page.url.pathname;
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
  <TabAnchor href="https://classroom.jhenbert.com" target="_blank">
    <svelte:fragment slot="lead">Virtual Classroom</svelte:fragment>
  </TabAnchor>
</TabGroup>
