<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<section>
  <div class="container mx-auto">
    <div
      class="flex flex-col items-center justify-center min-h-screen space-y-3"
    >
      {#if data.emailVerified}
        <p>Thank you! Email already verified</p>
      {:else}
        <form
          class="flex flex-col space-y-3"
          method="post"
          action="?/verifyEmail"
          use:enhance
        >
          <label class="label space-y-3">
            <span>Verify Email</span>
            <input
              class="input"
              type="text"
              name="code"
              placeholder="Enter verification code"
              autocomplete="off"
            />
          </label>
          <button type="submit" class="btn variant-filled-primary"
            >Verify</button
          >
        </form>
        <form method="post" action="?/resendVerificationCode" use:enhance>
          <button type="submit" class="btn btn-sm !bg-transparent text-sm"
            >Resend Verification Code</button
          >
        </form>
      {/if}
    </div>
  </div>
</section>
