<script lang="ts">
  import viewport from "@jhenbert/viewport-action";

  let loadComponent;
  export { loadComponent as this };

  export let threshold: number = 0;

  let isShowingComponent = false;
  let componentPromise: Promise<{
    default: ConstructorOfATypedSvelteComponent;
  }>;

  const handleEnterViewport = () => {
    componentPromise = loadComponent();
    isShowingComponent = true;
  };
</script>

{#if !isShowingComponent}
  <div use:viewport={threshold} on:enterViewport={handleEnterViewport} />
{:else}
  {#await componentPromise}
    <slot name="fallback">Loading...</slot>
  {:then { default: Component }}
    <slot name="component" {Component} />
  {/await}
{/if}
