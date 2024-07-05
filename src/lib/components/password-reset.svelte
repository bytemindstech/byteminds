<script>
  import { page } from "$app/stores";
  import { route } from "$lib/ROUTES";
  import { superForm } from "sveltekit-superforms/client";
  import { Toast } from "./ui";
  import Icon from "@iconify/svelte";

  export let formData;
  export let isResetPasswordTokenRequired = false;

  const { form, errors, constraints, message, enhance } = superForm(formData);

  const showPasswordHandle = () => ($form.showPassword = !$form.showPassword);

  const showConfirmPasswordHandle = () =>
    ($form.showConfirmPassword = !$form.showConfirmPassword);

  $: isPasswordIconVisible = $form.password && $form.password.length > 0;

  $: isConfirmPasswordIconVisible =
    $form.confirmPassword && $form.confirmPassword.length > 0;
</script>

{#if typeof $message === "string" && $message}
  {#if $page.status === 200}
    <Toast message={$message} type="success" />
  {:else}
    <Toast message={$message} type="error" />
  {/if}
{/if}
<form
  class="space-y-5"
  method="post"
  action={route("resetPassword /password-reset")}
  use:enhance
>
  <label class="label text-primary-500"
    ><span class="capitalize">new password</span>
    <div class="input-group grid-cols-[1fr_auto]">
      {#if $form.showPassword}
        <input
          class="input text-primary-700"
          type="text"
          name="password"
          placeholder="New Password"
          autocomplete="off"
          aria-invalid={$errors.password ? "true" : undefined}
          bind:value={$form.password}
          {...$constraints.password}
        />
      {:else}
        <input
          class="input text-primary-700"
          type="password"
          name="password"
          placeholder="New Password"
          autocomplete="off"
          aria-invalid={$errors.password ? "true" : undefined}
          bind:value={$form.password}
          {...$constraints.password}
        />
      {/if}
      <div>
        {#if isPasswordIconVisible}
          <button type="button" on:click={showPasswordHandle}
            ><Icon
              icon={$form.showPassword
                ? "mdi:eye-off-outline"
                : "mdi:eye-outline"}
              width="24"
              height="24"
            /></button
          >
        {/if}
      </div>
    </div>
  </label>

  <label class="label text-primary-500"
    ><span class="capitalize">confirm password</span>
    <div class="input-group grid-cols-[1fr_auto]">
      {#if $form.showConfirmPassword}<input
          class="input text-primary-700"
          type="text"
          name="confirmPassword"
          placeholder="Password"
          autocomplete="off"
          aria-invalid={$errors.confirmPassword ? "true" : undefined}
          bind:value={$form.confirmPassword}
          {...$constraints.confirmPassword}
        />
      {:else}
        <input
          class="input text-primary-700"
          type="password"
          name="confirmPassword"
          placeholder="Password"
          autocomplete="off"
          aria-invalid={$errors.confirmPassword ? "true" : undefined}
          bind:value={$form.confirmPassword}
          {...$constraints.confirmPassword}
        />
      {/if}
      <div>
        {#if isConfirmPasswordIconVisible}
          <button type="button" on:click={showConfirmPasswordHandle}
            ><Icon
              icon={$form.showConfirmPassword
                ? "mdi:eye-off-outline"
                : "mdi:eye-outline"}
              width="24"
              height="24"
            /></button
          >
        {/if}
      </div>
    </div>
  </label>

  {#if isResetPasswordTokenRequired}
    <input
      type="hidden"
      name="resetPasswordToken"
      value={$page.url.searchParams.get("token")}
    />
  {/if}
  <button
    class="btn variant-filled-tertiary min-w-full font-medium leading-none capitalize"
    type="submit">update password</button
  >
</form>
