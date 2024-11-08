<script lang="ts">
  import { Accordion } from "@skeletonlabs/skeleton";
  import { AccordionItem } from ".";
  interface Props {
    autocollapse: boolean;
    children?: import('svelte').Snippet<[any]>;
  }

  let { autocollapse, children }: Props = $props();
</script>

<Accordion {autocollapse}>
  {@render children?.({ AccordionItem, })}
</Accordion>
