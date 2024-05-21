<script lang="ts">
  export let icon;
  export let data;
  export let title;
  export let cardBg;
</script>

<div class="card card-hover p-4 {cardBg}">
  <header class="card-header"><h6 class="h6">{title}</h6></header>
  <section class="flex justify-between">
    {icon}<span><p>{data}</p></span>
  </section>
  <footer></footer>
</div>
