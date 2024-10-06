<script lang="ts">
  import { TutorGrid } from "$lib/components";
  import { onDestroy, onMount } from "svelte";
  import { resetTitle } from "$lib/util.client";
  import { TutorCard } from "$lib/components/ui";
  import type { PageData } from "./$types";

  export let data: PageData;

  let tutorsArr: any;

  $: tutors = tutorsArr as Array<{
    id: string;
    profile: { image: string };
    courses: Array<any>;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
  }>;

  onMount(async () => {
    const users = await data.users;
    tutorsArr = users.filter((user) => user.role === "TUTOR");
  });

  onDestroy(() => resetTitle(data.meta.title));
</script>

<svelte:head><title>{data.title}</title></svelte:head>

<div class="container min-h-screen mx-auto p-6">
  {#if tutors && tutors.length > 0}
    <TutorGrid {tutors}
      ><svelte:fragment slot="tutor-card" let:tutor
        ><TutorCard
          id={tutor.id}
          avatarImg={tutor.profile?.image}
          courses={tutor.courses}
          name={`${tutor.firstName} ${tutor.lastName.charAt(0)}.`}
          verified={tutor.isEmailVerified}
        />
      </svelte:fragment>
    </TutorGrid>
  {:else}
    <p class="text-lg font-bold">
      No freelance tutors available yet, stay tuned.
    </p>
  {/if}
</div>
