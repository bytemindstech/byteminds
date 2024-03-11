<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div
  class="container mx-auto min-h-screen flex flex-col justify-center items-center"
>
  <h2 class="h2 text-center mt-10">Welcome, {data.name}</h2>

  <!--for test only-->
  <form method="post" use:enhance>
    <button class="btn hover:variant-soft-primary">Logout</button>
  </form>
</div>
