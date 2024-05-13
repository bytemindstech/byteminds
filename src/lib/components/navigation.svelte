<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { page } from "$app/stores";
  import logo from "../../assets/images/logo.webp";
  import { Avatar, getDrawerStore } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();

  const drawerClose = () => {
    drawerStore.close();
  };

  const paths = [
    { name: "home", route: route("/") },
    { name: "about", route: route("/about") },
    { name: "faqs", route: route("/faqs") },
  ];

  $: classActive = (href: string) =>
    href === $page.url.pathname ? "!variant-soft-secondary" : "";
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
<a
  href={route("/register")}
  class="btn btn-lg variant-ghost-primary m-5"
  on:click={drawerClose}>Apply Now</a
>
