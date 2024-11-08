<script lang="ts">
  import type { PageData } from "./$types";
  import { UsersTable } from "$lib/components";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<div class="container mx-auto p-6">
  {#await data.users}
    <p class="text-lg font-bold">Loading tutors please wait....</p>
  {:then users}
    <UsersTable tableData={users} role="TUTOR" />
  {/await}
</div>
