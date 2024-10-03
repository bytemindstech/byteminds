<script lang="ts">
  import {
    UserBioPrivate,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: name = `${data.firstName} ${data.lastName}`;
  let img: string;
  let bio: string | undefined;

  onMount(async () => {
    const user = await data.user;

    img = user?.profile?.image ?? "";
    bio = user?.profile?.bio;
  });
</script>

<UserProfileLayout
  ><svelte:fragment slot="profile"
    ><UserProfile profileImg={img} email={data.email} {name} />
  </svelte:fragment>

  <svelte:fragment slot="bio">
    <div class="bg-surface-100 shadow rounded-lg p-6">
      <UserBioPrivate {bio} />
    </div>
  </svelte:fragment>
</UserProfileLayout>
