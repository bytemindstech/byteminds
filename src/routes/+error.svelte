<script lang="ts">
  import { page } from "$app/stores";
</script>

<section>
  <div class="container">
    <div class="flex items-center justify-center min-h-screen">
      <h1 class="h1 md:text-7xl">{$page.status} |</h1>
      <span><p class="md:text-2xl">{$page.error?.message}</p></span>
    </div>
  </div>
</section>
