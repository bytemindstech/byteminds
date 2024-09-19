<script lang="ts">
  import { enhance } from "$app/forms";
  import { route } from "$lib/ROUTES";
  import { getModalStore } from "@skeletonlabs/skeleton";

  const modalStore = getModalStore();
</script>

<div class="flex w-[1/4] shadow-lg bg-surface-100 rounded-md space-x-4 p-8">
  <form method="post" action={route("deleteCourse /tutor")} use:enhance>
    <button
      type="submit"
      class="btn variant-filled-primary"
      on:click={() => modalStore.close()}>Confirm</button
    >
    <button
      type="button"
      class="btn variant-filled-primary"
      on:click={() => modalStore.close()}>Cancel</button
    >
  </form>
</div>
