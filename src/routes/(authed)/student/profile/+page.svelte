<script lang="ts">
  import { UserBio, UserProfile, UserProfileLayout } from "$lib/components";
  import type { PageData } from "./$types";

  export let data: PageData;

  const name = `${data.firstName} ${data.lastName}`;
  const img = data.user?.profile?.image ?? "";
  const bio = data.user?.profile?.bio ?? "Please update your profile";
</script>

<UserProfileLayout
  ><svelte:fragment slot="profile"
    ><UserProfile profileImg={img} email={data.email} {name} />
  </svelte:fragment>

  <svelte:fragment slot="bio">
    <div class="bg-surface-100 shadow rounded-lg p-6">
      <UserBio profileBio={bio} />
    </div>
  </svelte:fragment>
</UserProfileLayout>
