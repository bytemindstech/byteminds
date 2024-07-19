<script lang="ts">
  import type { PageData } from "./$types";

  import { UserProfile } from "$lib/components";
  import UserProfileLayout from "$lib/components/user-profile-layout.svelte";
  import UserBio from "$lib/components/user-bio.svelte";

  export let data: PageData;

  const name = `${data.firstName} ${data.lastName}`;
  const bio =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in luctus risusrhoncus id.";
</script>

<div class="container mx-auto"></div>

<UserProfileLayout
  ><svelte:fragment slot="profile"
    ><UserProfile
      profileImg="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      email={data.email}
      {name}
    />
  </svelte:fragment>

  <svelte:fragment slot="bio">
    <div class="bg-surface-100 shadow rounded-lg p-6">
      <UserBio profileBio={bio} />
    </div>
  </svelte:fragment>
</UserProfileLayout>
