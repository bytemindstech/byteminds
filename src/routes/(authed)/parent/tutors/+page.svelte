<script lang="ts">
  import { Tutors } from "$lib/components";

  import type { PageData } from "./$types";

  export let data: PageData;

  $: tutors = data.tutors as Array<{
    id: string;
    profile: { image: string };
    courses: Array<any>;
    firstName: string;
    lastName: string;
    emailVerified: { isEmailVerified: boolean };
  }>;
</script>

<div class="container mx-auto p-6">
  {#if tutors && tutors.length > 0}
    <Tutors {tutors} />
  {:else}
    <p class="text-lg font-bold">
      No freelance tutors available yet, stay tuned.
    </p>
  {/if}
</div>
