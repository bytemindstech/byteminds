<script lang="ts">
  // import type { PageData } from "./$types";
  import { getCourses } from "$lib/util.client";
  import { CoursesTable } from "$lib/components";
</script>

<div class="container mx-auto p-6 min-h-screen">
  {#await getCourses()}
    <p class="text-lg font-bold">Loading courses please wait....</p>
  {:then response}
    {#if response.status === "success"}
      <CoursesTable tableData={response.data} />
    {:else if response.status === "error"}
      <p>Error encountered, {response.error.message}</p>
    {/if}
  {/await}
</div>
