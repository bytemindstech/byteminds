<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    title: any;
    subTitle?: Snippet<[any]>;
    data?: Snippet<[any]>;
  }

  let { title, subTitle, data }: Props = $props();
</script>

<h2 class="mb-2 mt-6 text-xl font-bold">{title}</h2>
<div class="mb-2">
  <div class="flex w-full flex-wrap justify-between gap-2">
    <span class="font-bold text-surface-700"
      >{@render subTitle?.({ addSubtitle: true })}
    </span>
    <p>
      <span class="mr-2 text-surface-700"
        >{@render data?.({ addData: true })}
      </span>
    </p>
  </div>
</div>
