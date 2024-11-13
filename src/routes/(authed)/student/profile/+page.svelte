<script lang="ts">
  import {
    UserBioPrivate,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";

  import { onMount } from "svelte";
  import { getFullName, getImage } from "$lib/util.client";

  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let name = $derived(getFullName(data.firstName, data.lastName));
  let image = $state("");
  let biography = $state("");

  onMount(async () => {
    const user = await data.user;
    const imageKey = user?.profile?.image?.key ?? "";
    const { url } = (await getImage(imageKey)) as ImageResponse;

    image = url;
    biography = user?.profile?.bio ?? "";
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
