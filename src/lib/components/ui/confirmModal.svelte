<script lang="ts">
  import { goto } from "$app/navigation";
  import { route } from "$lib/ROUTES";
  import { getModalStore } from "@skeletonlabs/skeleton";
  import { isDeletedStore } from "$lib/store";
  import { onDestroy } from "svelte";

  type DeleteResponse = {
    message: string;
    errorMessage: string;
  };

  const modalStore = getModalStore();
  const courseId = $modalStore[0].meta.id;

  let isDeleted: boolean;

  const confirmDelete = async () => {
    //delete logic
    try {
      const response = await fetch(
        route("DELETE /api/courses/[id]", { id: courseId }),
        { method: "DELETE", headers: { "Content-Type": "application/json" } },
      );

      if (response.ok) {
        const message: DeleteResponse = await response.json();
        console.log(`${message.message} with ID: ${courseId}`);
        // tracking the deletion state
        isDeletedStore.update((value) => !value);

        goto(route("/tutor"));
      } else {
        const errorMessage: DeleteResponse = await response.json();
        console.log(`Failed to delete course ${errorMessage.errorMessage}`);
      }
    } catch (error) {
      console.error("Error during deletion", (error as Error).message);
    }

    // closing the modal
    modalStore.close();
  };

  onDestroy(() => {
    isDeletedStore.set(false);
  });

  const unsubscribe = isDeletedStore.subscribe((value) => {
    isDeleted = value;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="w-modal-slim bg-surface-100 p-4 rounded-lg">
  <header class="mb-6">
    {#if $modalStore[0]}
      <h6 class="h6">
        Are you sure you want to delete {$modalStore[0].meta.title} course?
      </h6>
    {/if}
  </header>
  <footer class="flex justify-end">
    <div class="space-x-2">
      <button
        type="button"
        class="btn variant-filled-tertiary font-semibold"
        on:click={confirmDelete}>{isDeleted ? "Deleting..." : "Confirm"}</button
      >
      <button
        type="button"
        class="btn variant-filled-tertiary font-semibold"
        on:click={() => modalStore.close()}>Cancel</button
      >
    </div>
  </footer>
</div>
