<script lang="ts">
  import type { Snippet } from "svelte";

  type Paths = {
    route: string;
    name: string;
  };

  interface Props {
    paths: Paths[];
    button?: Snippet;
  }

  import { page } from "$app/stores";
  import { getDrawerStore } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();

  const drawerClose = () => {
    drawerStore.close();
  };

  let classActive = $derived((href: string) =>
    href === $page.url.pathname ? "!variant-filled-tertiary !font-bold" : "",
  );

  let { paths, button }: Props = $props();
</script>

<nav class="list-nav p-4">
  <ul>
    {#each paths as path}
      <li>
        <a
          href={path.route}
          onclick={drawerClose}
          class="{classActive(path.route)} font-semibold"
          >{path.name.toUpperCase()}</a
        >
      </li>
    {/each}
  </ul>
</nav>

<div class="mt-5 flex justify-center">
  {@render button?.()}
</div>
