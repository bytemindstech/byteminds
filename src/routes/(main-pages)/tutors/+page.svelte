<script lang="ts">
  import { Tutors } from "$lib/components";
  import { onDestroy, onMount } from "svelte";
  import type { PageData } from "./$types";
  import { resetTitle } from "$lib/util.client";

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

  onDestroy(resetTitle);
</script>

<svelte:head
  ><title>ByteMinds PH - Available Freelance Tutors</title></svelte:head
>

<div class="container min-h-screen mx-auto p-6">
  {#if tutors && tutors.length > 0}
    <Tutors {tutors} />
  {:else}
    <p class="text-lg font-bold">
      No freelance tutors available yet, stay tuned.
    </p>
  {/if}
</div>
