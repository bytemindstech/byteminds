<script>
  import { route } from "$lib/ROUTES";
  import { AppBar, AppShell } from "@skeletonlabs/skeleton";
</script>

<AppShell slotPageHeader="sticky top-0 z-10">
  <svelte:fragment slot="pageHeader">
    <AppBar>
      <svelte:fragment slot="lead"
        ><a href={route("/")}
          ><h2 class="h2">
            <span class="text-primary-800 dark:text-dark-token">Byte</span><span
              class="text-red-700"
              >Minds
            </span>
          </h2></a
        ></svelte:fragment
      >

      <svelte:fragment slot="trail"
        ><a href={route("/login")} class="btn hover:variant-soft-primary"
          >Login</a
        ></svelte:fragment
      >
    </AppBar>
  </svelte:fragment>

  <slot />
</AppShell>
