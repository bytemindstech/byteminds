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

  export let data: PageData;

  $: name = `${data.firstName} ${data.lastName}`;
  $: img = data.user?.profile?.image ?? "";

  onDestroy(() => resetTitle(data.meta.title));
</script>

<svelte:head><title>{data.title} {name}</title></svelte:head>

<UserProfileLayout
  ><svelte:fragment slot="profile"
    ><UserProfile profileImg={img} email={data.email} {name} />
  </svelte:fragment>

  <svelte:fragment slot="bio">
    <div class="bg-surface-100 shadow rounded-lg p-6">
      <UserBioPrivate bio={data.user?.profile?.bio} />
    </div>
  </svelte:fragment>
</UserProfileLayout>
