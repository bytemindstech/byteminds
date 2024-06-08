<script lang="ts">
  import { route } from "$lib/ROUTES";
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
</script>

<UserProfileLayout>
  <svelte:fragment slot="profile"
    ><UserProfile {name} profileImg="" email={data.email} /></svelte:fragment
  >
  <svelte:fragment slot="bio"
    ><div class="bg-surface-100 shadow rounded-lg p-6">
      <UserBio />
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
      <h3 class="h3 mb-4">Available Tutors</h3>
      <Tutors />
    </div>
  </svelte:fragment>
</UserProfileLayout>
