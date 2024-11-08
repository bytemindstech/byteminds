<script lang="ts">
  import {
    UserBioPrivate,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";
  import { onDestroy } from "svelte";
  import type { PageData } from "./$types";
  import { resetTitle } from "$lib/util.client";
  import { page } from "$app/stores";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let name = $derived(`${data.firstName} ${data.lastName}`);
  let img = $derived(data.user?.profile?.image ?? "");

  onDestroy(() => resetTitle(data.meta.title));
</script>

<svelte:head><title>{data.title} {name}</title></svelte:head>

<UserProfileLayout
  >{#snippet profile()}
    <UserProfile profileImg={img} email={data.email} {name} />
  {/snippet}

  {#snippet bio()}
    <div class="rounded-lg bg-surface-100 p-6 shadow">
      <UserBioPrivate bio={data.user?.profile?.bio} />
    </div>
  {/snippet}
</UserProfileLayout>
