<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  export let icon: any;
  export let summary: string;
  export let content: string;
</script>

<Accordion>
  <AccordionItem>
    <svelte:fragment slot="iconClosed"
      ><Icon icon="ic:baseline-minus" width="24" height="24" />
    </svelte:fragment>
    <svelte:fragment slot="iconOpen"
      ><Icon icon="tdesign:plus" width="24" height="24" />
    </svelte:fragment>

    <svelte:fragment slot="lead"
      ><svelte:component this={icon} />
    </svelte:fragment>
    <svelte:fragment slot="summary">{@html summary}</svelte:fragment>
    <svelte:fragment slot="content">{@html content}</svelte:fragment>
  </AccordionItem>
</Accordion>
