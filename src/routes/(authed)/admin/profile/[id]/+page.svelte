<script lang="ts">
  import { page } from "$app/stores";
  import {
    UserBioPublic,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: user = data.users.find((user) => user.id === $page.params.id);

  $: img = user?.profile?.image ?? "";
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
        <UserBioPublic bio={user.profile?.bio} />
      </div>
    </svelte:fragment>
  </UserProfileLayout>
{/if}
