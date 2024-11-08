<script lang="ts">
  import type { DataHandler } from "@vincjo/datatables";
  interface Props {
    handler: DataHandler;
  }

  let { handler }: Props = $props();
  let value: string | undefined = $state();
</script>

<input
  class="input sm:w-64 w-36"
  type="search"
  placeholder="Search..."
  bind:value
  oninput={() => handler.search(value as string)}
/>
