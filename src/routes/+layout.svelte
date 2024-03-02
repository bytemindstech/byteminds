<script>
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";
  import { LightSwitch, storePopup } from "@skeletonlabs/skeleton";
  import { AppShell, AppBar } from "@skeletonlabs/skeleton";
  import { Navigation, Footer, Join, Login, Register } from "$lib/components";
  import { page } from "$app/stores";

  import "../app.pcss";

  //requirement for popup
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

{#if $page.url.pathname === "/login"}
  <Login />
{:else if $page.url.pathname === "/register"}
  <Register />
{:else}
  <AppShell>
    <svelte:fragment slot="header">
      <AppBar>
        <svelte:fragment slot="lead"
          ><h2 class="h2">
            <span class="text-primary-800">Kode</span><span class="text-red-700"
              >Pipz</span
            >
          </h2></svelte:fragment
        >
        <Navigation />
        <svelte:fragment slot="trail"
          ><a href="/login" class="btn hover:variant-soft-primary">Login</a>
          <LightSwitch />
        </svelte:fragment>
      </AppBar>
    </svelte:fragment>

    <!-- Router Slot -->
    <slot />
    <Join />
    <!-- ---- / ---- -->
    <svelte:fragment slot="pageFooter">
      <Footer />
    </svelte:fragment>
    <!-- (footer) -->
  </AppShell>
{/if}
