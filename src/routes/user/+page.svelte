<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="container mx-auto min-h-screen flex justify-center items-center">
  <h2 class="h2 text-center mt-10">Welcome {data.username}</h2>
</div>
