<script lang="ts">
  type Paths = {
    route: string;
    name: string;
  };

  import { page } from "$app/stores";
  import logo from "$lib/assets/images/logo.webp";
  import { Avatar, getDrawerStore } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();

  const drawerClose = () => {
    drawerStore.close();
  };

  $: classActive = (href: string) =>
    href === $page.url.pathname ? "!variant-filled-primary" : "";

  export let paths: Paths[];
</script>

<nav class="list-nav p-4">
  <div class="flex justify-center mb-4">
    <Avatar src={logo} width="w-20 md:w-32" />
  </div>
  <ul>
    {#each paths as path}
      <li>
        <a
          href={path.route}
          on:click={drawerClose}
          class={classActive(path.route)}>{path.name.toUpperCase()}</a
        >
      </li>
    {/each}
  </ul>
</nav>
