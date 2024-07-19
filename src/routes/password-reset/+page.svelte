<script lang="ts">
  import { PasswordReset } from "$lib/components";
  import { route } from "$lib/ROUTES";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="container mx-auto min-h-screen flex items-center justify-center">
  {#if !data.passwordResetTokenStatus.isValid}
    <div class="flex flex-col items-center justify-center space-y-5">
      <h2 class="h2 text-error-800">{data.passwordResetTokenStatus.message}</h2>

      <a href={route("/signin-signup")} class="btn variant-filled-error"
        >Return to login page and request a new reset token</a
      >
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center space-y-4">
      <h1 class="h1 leading-none">Reset Password</h1>

      <PasswordReset
        formData={data.passwordResetFormData}
        isResetPasswordTokenRequired={true}
      />
    </div>
  {/if}
</div>
