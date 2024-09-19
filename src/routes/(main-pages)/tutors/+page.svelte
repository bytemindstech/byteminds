<script lang="ts">
  import { Tutors } from "$lib/components";
  import { onDestroy } from "svelte";

  import type { PageData } from "./$types";
  import { resetTitle } from "$lib/util.client";

  export let data: PageData;

  $: tutors = data.tutors as Array<{
    id: string;
    profile: { image: string };
    courses: Array<any>;
    firstName: string;
    lastName: string;
    emailVerified: { isEmailVerified: boolean };
  }>;

  onDestroy(resetTitle);
</script>

<svelte:head
  ><title>ByteMinds PH - Available Freelance Tutors</title></svelte:head
>

<div class="container min-h-screen mx-auto p-6">
  {#if tutors}
    <Tutors {tutors} />
  {:else}
    <p class="text-lg font-bold">
      No freelance tutors available yet, stay tuned.
    </p>
  {/if}
</div>
