<script lang="ts">
  import Icon from "@iconify/svelte";
  import { AccordionItem } from "@skeletonlabs/skeleton";
  interface Props {
    icon: any;
    summary: string;
    content: string;
    open: boolean;
  }

  let {
    icon,
    summary,
    content,
    open
  }: Props = $props();
</script>

<AccordionItem {open}>
  {#snippet iconClosed()}
    <Icon icon="ic:baseline-minus" width="24" height="24" />
    
  {/snippet}
  {#snippet iconOpen()}
    <Icon icon="tdesign:plus" width="24" height="24" />
    
  {/snippet}

  {#snippet lead()}
  {@const SvelteComponent = icon}
    <SvelteComponent />
    
  {/snippet}
  {#snippet summary()}
    {@html summary}
  {/snippet}
  {#snippet content()}
    {@html content}
  {/snippet}
</AccordionItem>
