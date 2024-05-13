<script lang="ts">
  export let icon;
  export let data;
  export let title;
  export let cardBg;
</script>

<div class="card card-hover p-4 {cardBg}">
  <header class="font-medium text-lg">{title}</header>
  <div class="flex justify-between">{icon}<span>{data}</span></div>
  <footer></footer>
</div>
