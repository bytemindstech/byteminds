<script lang="ts">
  import { TutorGrid } from "$lib/components";
  import { onMount } from "svelte";
  import { TutorCard } from "$lib/components/ui";

  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let tutorsArr: any = $state([]);

  let tutors = $derived(
    tutorsArr as Array<{
      id: string;
      profile: { image: { key?: string } };
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
</script>

<div class="container mx-auto min-h-screen p-6">
  {#if tutors && tutors.length > 0}
    <TutorGrid {tutors}>
      {#snippet tutorCard({ tutor })}
        <TutorCard
          id={tutor.id}
          avatarImageKey={tutor.profile?.image?.key as string}
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
