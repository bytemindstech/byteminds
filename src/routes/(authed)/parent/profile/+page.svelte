<script lang="ts">
  import type { PageData } from "./$types";

  import { UserBioPrivate, UserProfile } from "$lib/components";
  import UserProfileLayout from "$lib/components/UserProfileLayout.svelte";
  import { onMount } from "svelte";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let user: any = $state();

  let name = $derived(`${data.firstName} ${data.lastName}`);
  let img = $derived(user?.profile?.image ?? "");
  let biography = $derived(user?.profile?.bio ?? "Please update your profile");

  onMount(async () => {
    user = await data.user;
  });
</script>

<UserProfileLayout
  >{#snippet profile()}
    <UserProfile profileImg={img} email={data.email} {name} />
    
  {/snippet}

  {#snippet bio()}
  
      <div class="bg-surface-100 shadow rounded-lg p-6">
        <UserBioPrivate bio={biography} />
      </div>
    
  {/snippet}
</UserProfileLayout>
