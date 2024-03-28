<script lang="ts">
  import { Accordion } from "@skeletonlabs/skeleton";
  export let autocollapse: boolean;
</script>

<Accordion {autocollapse}>
  <slot name="accordionItem" />
</Accordion>
