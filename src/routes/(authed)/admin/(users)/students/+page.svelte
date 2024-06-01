<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { createConnection } from "./notification.store";

  export let data: PageData;

  $: currentUserId = data.user ? data.user.id : "";

  let notificationStore: ReturnType<typeof createConnection>;

  onMount(() => {
    notificationStore = createConnection(currentUserId);

    notificationStore.init();

    return () => notificationStore.close();
  });
</script>

<div class="container mx-auto p-4">
  <h2 class="h2">Students Data</h2>

  <div class="grid justify-items-center">
    {#await data.users}
      <p>Loading...</p>
    {:then users}
      {#each users as user}
        {#if data.user && user.id !== data.user.id}
          <p>{user.username}</p>
          <p>
            <button
              class="btn btn-lg bg-surface-50"
              on:click={() =>
                notificationStore.notify(
                  user.id,
                  `A notification from ${data.user?.email}`,
                  "success",
                )}>Notify</button
            >
          </p>
        {/if}
      {/each}
    {/await}
  </div>

  <div>
    {#if $notificationStore}
      {#each $notificationStore as notification}
        <p
          class={notification.type === "success"
            ? "text-success"
            : "text-error"}
        >
          {notification.message}
        </p>
      {/each}
    {/if}
  </div>
</div>
