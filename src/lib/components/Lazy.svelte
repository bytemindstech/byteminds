<script lang="ts">
  import viewport from "$lib/viewportAction";

  let loadComponent;
  export { loadComponent as this };

  let isShowing = false;
  let componentPromise: Promise<{
    default: ConstructorOfATypedSvelteComponent;
  }>;

  const handleEnterViewport = () => {
    componentPromise = loadComponent();
    isShowing = true;
  };
</script>

{#if !isShowing}
  <div use:viewport on:enterViewport={handleEnterViewport} />
{:else}
  {#await componentPromise}
    <slot name="loading">Loading...</slot>
  {:then { default: Component }}
    <slot name="component" {Component} />
  {/await}
{/if}
