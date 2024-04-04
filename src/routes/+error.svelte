<script lang="ts">
  import { page } from "$app/stores";
</script>

<h1 class="h1 text-center mt-5">{$page.status}: {$page.error?.message}</h1>
