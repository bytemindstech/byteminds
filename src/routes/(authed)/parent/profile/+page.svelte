<script lang="ts">
  import type { PageData } from "./$types";

  import { UserBioPrivate, UserProfile } from "$lib/components";
  import UserProfileLayout from "$lib/components/user-profile-layout.svelte";

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
