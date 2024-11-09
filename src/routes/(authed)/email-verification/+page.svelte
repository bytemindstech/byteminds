<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from "./$types";
  import { route } from "$lib/ROUTES";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  const { form, errors, constraints, message, delayed, enhance } = superForm(
    data.verifyEmailForm,
    {
      resetForm: true,
    },
  );

  const {
    message: resendCodeMessage,
    enhance: resendCodeEnhance,
    delayed: resendCodeDelayed,
  } = superForm(data.resendCodeForm, { resetForm: true });
</script>

<div class="container mx-auto flex min-h-full items-center justify-center">
  <div class="flex flex-col items-center">
    {#if data.user?.isEmailVerified}
      <p>Thank you! Email already verified</p>
    {:else}
      <form
        class="flex flex-col space-y-3"
        method="POST"
        action={route("verifyEmail /email-verification")}
        use:enhance
      >
        <label class="label">
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
        <button
          type="submit"
          class="variant-filled-primary btn"
          disabled={$delayed}
          >{$delayed ? "Verifying email..." : "Verify Email"}</button
        >
      </form>
      {#if $message && typeof $message === "string"}
        <p class="text-sm text-error-600">{$message}</p>
      {/if}

      <form
        method="POST"
        action={route("resendVerificationCode /email-verification")}
        use:resendCodeEnhance
      >
        <button
          type="submit"
          class="btn btn-sm !bg-transparent text-sm"
          disabled={$resendCodeDelayed}
          >{$resendCodeDelayed
            ? "Re-sending verification code ..."
            : "Re-send Verification Code"}</button
        >
      </form>
      {#if $resendCodeMessage && typeof $resendCodeMessage === "string"}
        <p class="text-sm text-success-700">{$resendCodeMessage}</p>
      {/if}
    {/if}
  </div>
</div>
