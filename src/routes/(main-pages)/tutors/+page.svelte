<script lang="ts">
  import { Tutors } from "$lib/components";
  import { onDestroy, onMount } from "svelte";
  import { resetTitle } from "$lib/util.client";
  import type { PageData } from "./$types";

  export let data: PageData;

  let tutorsArr: any;
  $: isLoading = true;
  $: tutors = tutorsArr as Array<{
    id: string;
    profile: { image: string };
    courses: Array<any>;
    firstName: string;
    lastName: string;
    emailVerified: { isEmailVerified: boolean };
  }>;

  onMount(async () => {
    const users = await data.users;
    tutorsArr = users.filter((user) => user.role?.isTutor);
    isLoading = false;
  });

  onDestroy(resetTitle);
</script>

<svelte:head
  ><title>ByteMinds PH - Available Freelance Tutors</title></svelte:head
>

<div class="container min-h-screen mx-auto p-6">
  {#if isLoading}
    <p class="text-lg font-bold">Loading tutors please wait....</p>
  {:else if tutors}
    <Tutors {tutors} />
  {:else}
    <p class="text-lg font-bold">
      No freelance tutors available yet, stay tuned.
    </p>
  {/if}
</div>
