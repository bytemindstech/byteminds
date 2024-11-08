<script lang="ts">
  import type { PageData } from "./$types";
  import { AllUsersTable } from "$lib/components";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<div class="container mx-auto p-6">
  {#await data.users}
    <p class="text-lg font-bold">Loading users please wait....</p>
  {:then users}
    <AllUsersTable data={users} />
  {/await}
</div>
