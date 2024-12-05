<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { getFullName, getImage, resetTitle } from "$lib/util.client";
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

  let image = $state("");

  let imageKey = $derived(data.user?.profile?.image?.key);
  let name = $derived(getFullName(data.firstName, data.lastName));

  onMount(async () => {
    const { url } = (await getImage(imageKey as string)) as ImageResponse;

    image = url;
  });

  // onDestroy(() => resetTitle(data.meta.title));
</script>

<svelte:head><title>{data.title} {name}</title></svelte:head>

<UserProfileLayout
  >{#snippet profile()}
    <UserProfile profileImage={image} email={data.email} {name} />
  {/snippet}

  {#snippet bio()}
    <div class="rounded-lg bg-surface-100 p-6 shadow">
      <UserBioPrivate bio={data.user?.profile?.bio} />
    </div>
  {/snippet}
</UserProfileLayout>
