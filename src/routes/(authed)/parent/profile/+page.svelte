<script lang="ts">
  import type { PageData } from "./$types";

  import { UserBioPrivate, UserProfile } from "$lib/components";
  import UserProfileLayout from "$lib/components/user-profile-layout.svelte";
  import { onMount } from "svelte";

  export let data: PageData;

  let user: any;

  $: name = `${data.firstName} ${data.lastName}`;
  $: img = user?.profile?.image ?? "";
  $: bio = user?.profile?.bio ?? "Please update your profile";

  onMount(async () => {
    user = await data.user;
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
