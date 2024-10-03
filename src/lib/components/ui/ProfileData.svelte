<script lang="ts">
  export let title;
</script>

<h2 class="text-xl font-bold mt-6 mb-2">{title}</h2>
<div class="mb-2">
  <div class="flex justify-between flex-wrap gap-2 w-full">
    <span class="text-surface-700 font-bold"
      ><slot name="subTitle" let-addSubtitle />
    </span>
    <p>
      <span class="text-surface-700 mr-2"
        ><slot name="data" let-addData />
      </span>
    </p>
  </div>
</div>
