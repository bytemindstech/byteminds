<script lang="ts">
  import { page } from "$app/stores";
  import { UserBio, UserProfile, UserProfileLayout } from "$lib/components";
  import type { PageData } from "./$types";

  export let data: PageData;

  const userId = $page.params.id;

  const user = data.users.find((user) => user.id === userId);

  const img = user?.profile?.image ?? "";
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
        <UserBio
          profileBio={user.profile?.bio ?? "Please update your profile"}
        />
      </div>
    </svelte:fragment>
  </UserProfileLayout>
{/if}
