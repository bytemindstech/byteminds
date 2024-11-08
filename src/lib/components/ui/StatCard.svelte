<script lang="ts">
  import type { Snippet } from "svelte";
  interface Props {
    data: any;
    title: any;
    cardBg: any;
    icon?: Snippet;
  }

  let { data, title, cardBg, icon }: Props = $props();
</script>

<div class="card card-hover p-6 {cardBg} overflow-hidden">
  <header class="card-header">
    <h4 class="h4 mb-4">{title}</h4>
  </header>
  <section class="flex justify-between">
    {@render icon?.()}
    <span>
      <h1 class="h1 text-surface-600/40">{data}</h1>
    </span>
  </section>
</div>
