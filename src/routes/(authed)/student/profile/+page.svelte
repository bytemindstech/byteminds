<script lang="ts">
  import {
    UserBioPrivate,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let name = $derived(`${data.firstName} ${data.lastName}`);
  let img: string | undefined = $state();
  let biography: string | undefined = $state();

  onMount(async () => {
    const user = await data.user;

    img = user?.profile?.image ?? "";
    biography = user?.profile?.bio;
  });
</script>

<UserProfileLayout
  >{#snippet profile()}
    <UserProfile profileImg={img as string} email={data.email} {name} />
    
  {/snippet}

  {#snippet bio()}
  
      <div class="bg-surface-100 shadow rounded-lg p-6">
        <UserBioPrivate bio={biography} />
      </div>
    
  {/snippet}
</UserProfileLayout>
