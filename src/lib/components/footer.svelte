<script lang="ts">
  import Icon from "@iconify/svelte";

  export let year: number;
  export let brand: string;
</script>

<h5 class="h5 p-7 text-center">&copy {year} {brand}</h5>
