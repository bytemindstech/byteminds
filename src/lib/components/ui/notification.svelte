<script>
  import Icon from "@iconify/svelte";
  export let notify;
</script>

<div class="relative inline-block">
  <span class="badge-icon variant-filled-warning absolute -top-0 -right-0 z-10"
    >{notify}</span
  >
  <Icon icon="carbon:notification" width="32" height="32" />
</div>
