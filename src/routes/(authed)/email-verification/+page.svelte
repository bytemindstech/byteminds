<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from "./$types";
  import { route } from "$lib/ROUTES";

  export let data: PageData;

  const { form, errors, constraints, message, enhance } = superForm(
    data.verifyEmailForm,
    {
      resetForm: true,
    },
  );

  const {
    message: resendCodeMessage,
    enhance: resendCodeEnhance,
    formId,
  } = superForm(data.resendCodeForm, { resetForm: true });
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
          action={route("verifyEmail /email-verification")}
          use:enhance
        >
          <label class="label space-y-3">
            <span>Verify Email</span>
            <input
              class="input"
              type="text"
              placeholder="Enter verification code"
              name="code"
              autocomplete="off"
              aria-invalid={$errors.code ? "true" : undefined}
              bind:value={$form.code}
              {...$constraints.code}
            />
            {#if $errors.code}
              <p class="text-sm text-error-600">{$errors.code}</p>
            {/if}
          </label>
          <button type="submit" class="btn variant-filled-primary"
            >Verify Email</button
          >
        </form>
        {#if $message}
          <p class="text-sm text-error-600">{$message}</p>
        {/if}
        <form
          method="post"
          action={route("resendVerificationCode /email-verification")}
          use:resendCodeEnhance
        >
          <input type="hidden" name="__superform_id" bind:value={$formId} />
          <button type="submit" class="btn btn-sm !bg-transparent text-sm"
            >Resend Verification Code</button
          >
        </form>
        {#if $resendCodeMessage}
          <p class="text-sm text-success-700">{$resendCodeMessage}</p>
        {/if}
      {/if}
    </div>
  </div>
</section>
