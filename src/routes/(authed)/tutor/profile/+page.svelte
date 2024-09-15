<script lang="ts">
  import {
    UserBioPrivate,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";

  import type { PageData } from "./$types";

  export let data: PageData;

  $: name = `${data.firstName} ${data.lastName}`;
  $: img = data.user?.profile?.image ?? "";
</script>

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
