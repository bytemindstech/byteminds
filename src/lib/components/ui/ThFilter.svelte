<script lang="ts">
  import type { DataHandler } from "@vincjo/datatables";
  interface Props {
    handler: DataHandler;
    filterBy: string;
  }

  let { handler, filterBy }: Props = $props();
  let value: string | undefined = $state();
</script>

<th>
  <input
    class="input text-sm w-full"
    type="text"
    placeholder="Filter"
    bind:value
    oninput={() => {
      if (filterBy) handler.filter(value, filterBy);
    }}
  />
</th>
