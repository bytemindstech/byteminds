<script lang="ts">
  import { Courses } from "$lib/components";

  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="container mx-auto p-6">
  {#await data.courses}
    <p class="text-lg font-bold">Loading courses please wait....</p>
  {:then courses}
    {#if courses && courses.length > 0}
      <Courses {courses} />
    {:else}
      <p class="text-lg font-bold">No courses available yet, stay tuned.</p>
    {/if}
  {/await}
</div>
