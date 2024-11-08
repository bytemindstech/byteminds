<script lang="ts">
  import { TutorGrid } from "$lib/components";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { TutorCard } from "$lib/components/ui";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let tutorsArr: any;
  let isLoading = $state(true);

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
    isLoading = false;
  });
</script>

<div class="container mx-auto p-6">
  {#if isLoading}
    <p class="text-lg font-bold">Loading tutors please wait....</p>
  {:else if tutors && tutors.length > 0}
    <TutorGrid {tutors}>
      {#snippet tutorCard({ tutor })}
        <TutorCard
          id={tutor.id}
          avatarImg={tutor.profile?.image}
          courses={tutor.courses}
          name={`${tutor.firstName} ${tutor.lastName.charAt(0)}.`}
          verified={tutor.isEmailVerified}
        />
      {/snippet}
    </TutorGrid>
  {:else}
    <p class="text-lg font-bold">
      No freelance tutors available yet, stay tuned.
    </p>
  {/if}
</div>
