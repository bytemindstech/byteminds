<script lang="ts">
  import { onMount } from "svelte";
  import { getImage } from "$lib/util.client";
  import {
    UserBioPrivate,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";

  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let user: any = $state();
  let image = $state("");

  let name = $derived(`${data.firstName} ${data.lastName}`);
  let imageKey = $derived(user?.profile?.image.key ?? "");
  let biography = $derived(user?.profile?.bio ?? "Please update your profile");

  onMount(async () => {
    user = await data.user;

    const { url } = (await getImage(imageKey)) as ImageResponse;
    image = url;
  });
</script>

<UserProfileLayout
  >{#snippet profile()}
    <UserProfile profileImage={image} email={data.email} {name} />
  {/snippet}

  {#snippet bio()}
    <div class="rounded-lg bg-surface-100 p-6 shadow">
      <UserBioPrivate bio={biography} />
    </div>
  {/snippet}
</UserProfileLayout>
