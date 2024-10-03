<script lang="ts">
  import { Accordion } from "@skeletonlabs/skeleton";
  import { AccordionItem } from ".";
  export let autocollapse: boolean;
</script>

<Accordion {autocollapse}>
  <slot {AccordionItem} />
</Accordion>
