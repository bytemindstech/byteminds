<script lang="ts">
  import { TutorGrid } from "$lib/components";
  import { onDestroy, onMount } from "svelte";
  import { resetTitle } from "$lib/util.client";
  import { TutorCard } from "$lib/components/ui";
  import type { PageData } from "./$types";
  import { any } from "zod";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let tutorsArr: any = $state([]);

  let tutors = $derived(
    tutorsArr as Array<{
      id: string;
      profile: { image: string };
      courses: Array<any>;
      firstName: string;
      lastName: string;
      isEmailVerified: boolean;
    }>,
  );

  onMount(async () => {
    const users = await data.users;
    tutorsArr = users.filter((user) => user.role === "TUTOR");
  });

  onDestroy(() => resetTitle(data.meta.title));
</script>

<svelte:head><title>{data.title}</title></svelte:head>

<div class="container mx-auto min-h-screen p-6">
  {#if tutors && tutors.length > 0}
    <TutorGrid {tutors}>
      {#snippet tutorCard({ tutor })}
        <TutorCard
          id={tutor.id}
          avatarImg={tutor.profile?.image}
          courses={tutor.courses}
          name={`${tutor.firstName} ${tutor.lastName.charAt(0).toUpperCase()}.`}
          verified={tutor.isEmailVerified}
        />
      {/snippet}
    </TutorGrid>
  {:else}
    <p class="semi-bold text-lg">
      Be the first to join our team of freelance tutors — apply today!
    </p>
  {/if}
</div>
