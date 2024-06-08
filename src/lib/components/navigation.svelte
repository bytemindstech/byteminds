<script lang="ts">
  type Paths = {
    route: string;
    name: string;
  };

  import { page } from "$app/stores";
  import { route } from "$lib/ROUTES";
  import { Avatar, getDrawerStore } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();

  const drawerClose = () => {
    drawerStore.close();
  };

  $: classActive = (href: string) =>
    href === $page.url.pathname ? "!variant-filled-tertiary !font-bold" : "";

  export let paths: Paths[];
</script>

<nav class="list-nav p-4">
  <div class="flex justify-center mb-8">
    <Avatar
      src={route("githubAvatar", { avatarId: 159615949 })}
      width="w-20 md:w-32"
    />
  </div>
  <ul>
    {#each paths as path}
      <li>
        <a
          href={path.route}
          on:click={drawerClose}
          class="{classActive(path.route)} font-semibold"
          >{path.name.toUpperCase()}</a
        >
      </li>
    {/each}
  </ul>
</nav>

<div class="flex justify-center mt-5">
  <slot name="button" />
</div>
