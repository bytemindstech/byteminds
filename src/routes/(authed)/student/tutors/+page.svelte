<script lang="ts">
  import { Tutors } from "$lib/components";
  import type { EmailVerified } from "@prisma/client";
  import { onMount } from "svelte";

  import type { PageData } from "./$types";

  export let data: PageData;

  let tutorArr: any;

  $: isLoading = true;
  $: tutors = tutorArr as Array<{
    id: string;
    profile: { image: string };
    courses: Array<any>;
    firstName: string;
    lastName: string;
    isEmailVerified: EmailVerified;
  }>;

  onMount(async () => {
    const users = await data.users;
    tutorArr = users.filter((user) => user.role === "TUTOR");
    isLoading = false;
  });
</script>

<div class="container mx-auto p-6">
  {#if isLoading}
    <p class="text-lg font-bold">Loading tutors please wait....</p>
  {:else if tutors && tutors.length > 0}
    <Tutors {tutors} />
  {:else}
    <p class="text-lg font-bold">
      No freelance tutors available yet, stay tuned.
    </p>
  {/if}
</div>
