<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import {
    UserBioPublic,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";
  
  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let user: any = $state();
  let img: string | undefined = $state();
  let biography: string | undefined = $state();

  onMount(async () => {
    const users = await data.users;
    user = users.find((user) => user.id === $page.params.id);

    img = user.profile?.image;
    biography = user.profile?.bio;
  });
</script>

{#if user}
  <UserProfileLayout
    >{#snippet profile()}
        <UserProfile
          profileImg={img as string}
          email={user.email}
          name={`${user.firstName} ${user.lastName}`}
        />
      
      {/snippet}

    {#snippet bio()}
      
        <div class="bg-surface-100 shadow rounded-lg p-6">
          <UserBioPublic biography={biography as string} />
        </div>
      
      {/snippet}
  </UserProfileLayout>
{/if}
