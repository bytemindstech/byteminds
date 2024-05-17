<script lang="ts">
  import { enhance } from "$app/forms";
  import { route } from "$lib/ROUTES";
  import { UserNav } from "$lib/components";
  import { AppBar, AppShell, Avatar, popup } from "@skeletonlabs/skeleton";
  import type { PopupSettings } from "@skeletonlabs/skeleton";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  const popupQuery: PopupSettings = {
    event: "click",
    target: "popupQuery",
    placement: "bottom",
  };
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

      <UserNav />

      <svelte:fragment slot="trail">
        <button class="btn hover:variant-soft-primary" use:popup={popupQuery}>
          <span class="hidden md:block"
            >{data.firstName}
            {data.lastName}
          </span>
          <span class="md:hidden"
            ><Avatar
              initials={`${data.firstName.charAt(0).toUpperCase()}${data.lastName.charAt(0).toUpperCase()}`}
              background="bg-primary-500"
              width="w-10"
            /></span
          >
        </button>
        <div
          class="card p-2 max-w-sm variant-filled-secondary"
          data-popup="popupQuery"
        >
          <form method="post" action={route("default /logout")} use:enhance>
            <button class="btn hover:variant-filled-error">Logout</button>
          </form>
          <div class="arrow bg-surface-100-800-token" />
        </div>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <slot />
</AppShell>
