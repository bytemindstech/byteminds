<script lang="ts">
  import {
    Courses,
    Tutors,
    UserBio,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";
  import type { PageData } from "./$types";

  export let data: PageData;

  const name = `${data.firstName} ${data.lastName}`;

  const bio =
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in luctus risusrhoncus id."';
</script>

<UserProfileLayout>
  <svelte:fragment slot="profile"
    ><UserProfile
      {name}
      profileImg=""
      email={data.email}
      role={data}
    /></svelte:fragment
  >
  <svelte:fragment slot="bio"
    ><div class="bg-surface-100 shadow rounded-lg p-6">
      <UserBio profileBio={bio} />
    </div></svelte:fragment
  >
  <svelte:fragment slot="courses"
    ><div class="bg-surface-100 shadow rounded-lg p-6 mt-8">
      <h3 class="h3 mb-4">Available Courses</h3>
      <Courses />
    </div></svelte:fragment
  >
  <svelte:fragment slot="tutors"
    ><div class="bg-surface-100 shadow rounded-lg p-6 mt-8">
      <h3 class="h3 mb-4">Freelance Tutors</h3>
      <Tutors />
    </div>
  </svelte:fragment>
</UserProfileLayout>
