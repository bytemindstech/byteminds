<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import {
    UserBioPublic,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";
  
  export let data: PageData;

  let user: any;
  let img: string;
  let bio: string;

  onMount(async () => {
    const users = await data.users;
    user = users.find((user) => user.id === $page.params.id);

    img = user.profile?.image;
    bio = user.profile?.bio;
  });
</script>

{#if user}
  <UserProfileLayout
    ><svelte:fragment slot="profile"
      ><UserProfile
        profileImg={img}
        email={user.email}
        name={`${user.firstName} ${user.lastName}`}
      />
    </svelte:fragment>

    <svelte:fragment slot="bio">
      <div class="bg-surface-100 shadow rounded-lg p-6">
        <UserBioPublic {bio} />
      </div>
    </svelte:fragment>
  </UserProfileLayout>
{/if}
