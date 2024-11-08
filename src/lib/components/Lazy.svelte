<script lang="ts">
  import type { Snippet } from "svelte";
  import viewport from "@jhenbert/viewport-action";

  interface Props {
    this: any;
    threshold?: number;
    fallback?: Snippet;
    component?: Snippet<[{ Component: ConstructorOfATypedSvelteComponent }]>;
  }

  let {
    this: loadComponent,
    threshold = 0,
    fallback,
    component,
  }: Props = $props();

  let isShowingComponent = $state(false);

  let componentPromise:
    | Promise<{
        default: ConstructorOfATypedSvelteComponent;
      }>
    | undefined = $state();

  const handleEnterViewport = () => {
    componentPromise = loadComponent();
    isShowingComponent = true;
  };
</script>

{#if !isShowingComponent}
  <div use:viewport={threshold} onenterViewport={handleEnterViewport}></div>
{:else if componentPromise}
  {#await componentPromise}
    {#if fallback}{@render fallback()}{:else}Loading...{/if}
  {:then { default: Component }}
    {@render component?.({ Component })}
  {/await}
{/if}
