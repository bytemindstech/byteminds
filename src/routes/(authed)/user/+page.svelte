<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div
  class="container mx-auto min-h-screen flex flex-col justify-center items-center"
>
  <h2 class="h2 text-center mt-10">Welcome, {data.name}</h2>
  <p class="text-center text-lg">
    Email Verified: {#if data.emailVerified}
      Yes
    {:else}
      No
    {/if}
  </p>
  <p class="text-center text-sm">Email: {data.email}</p>
  {#if !data.emailVerified}
    <a
      href="/email-verification"
      type="button"
      class="btn variant-filled-primary mt-5">Verify Email</a
    >
  {/if}
</div>
