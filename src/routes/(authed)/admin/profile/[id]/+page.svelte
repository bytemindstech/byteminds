<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import {
    UserBioPublic,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";
  import { getImage } from "$lib/util.client";

  interface Props {
    data: PageData;
  }

  type UserType = {
    firstName: string;
    lastName: string;
    email: string;
    profile: { image: { key: string }; bio: string };
  };

  let { data }: Props = $props();

  let user = $state({
    firstName: "",
    lastName: "",
    email: "",
    profile: { image: { key: "" }, bio: "" },
  });
  let image = $state("");
  let biography = $state("");

  onMount(async () => {
    const users = await data.users;

    user = users.find((user) => user.id === $page.params.id) as UserType;

    const imageKey = user.profile?.image?.key;
    const { url } = (await getImage(imageKey)) as ImageResponse;

    image = url;
    biography = user.profile?.bio;
  });
</script>

{#if user}
  <UserProfileLayout
    >{#snippet profile()}
      <UserProfile
        profileImage={image}
        email={user.email}
        name={`${user.firstName} ${user.lastName}`}
      />
    {/snippet}

    {#snippet bio()}
      <div class="rounded-lg bg-surface-100 p-6 shadow">
        <UserBioPublic {biography} />
      </div>
    {/snippet}
  </UserProfileLayout>
{/if}
