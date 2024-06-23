<script lang="ts">
  import { route } from "$lib/ROUTES";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<!-- Ma'am Jammie's task,  
input your idea about tutors dashboard, showing basic profile of a user, you can just hardcode the data, not necessarily to fetch data from database -->

<div
  class="container mx-auto flex flex-col justify-center items-center min-h-full"
>
  <h2 class="h2 text-center mt-10">Welcome, {data.firstName}</h2>
  <p class="text-center text-lg">
    Email Verified: {#if data.user?.emailVerified}
      Yes
    {:else}
      No
    {/if}
  </p>
  <p class="text-center text-sm">Email: {data.email}</p>
  {#if !data.user?.emailVerified}
    <a
      href={route("/email-verification")}
      type="button"
      class="btn variant-filled-primary mt-5">Verify Email</a
    >
  {/if}
</div>
