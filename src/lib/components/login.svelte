<script lang="ts">
  import { page } from "$app/stores";
  import { route } from "$lib/ROUTES";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { Toast } from "./ui";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Icon from "@iconify/svelte";
  import { superForm } from "sveltekit-superforms/client";
  // import SuperDebug from "sveltekit-superforms";

  export let loginFormData;
  export let resetPasswordEmailFormData;

  const { form, errors, constraints, message, delayed, enhance } = superForm(
    loginFormData,
    {
      resetForm: true,
    },
  );

  const {
    form: resetPasswordEmailForm,
    errors: resetPasswordEmailErrors,
    constraints: resetPasswordEmailConstraints,
    message: resetPasswordEmailMessage,
    enhance: resetPasswordEmailEnhance,
    delayed: resetPasswordEmailDelayed,
  } = superForm(resetPasswordEmailFormData, {
    resetForm: true,
  });

  let isForgotPasswordTriggered = false;

  const handleClick = () =>
    (isForgotPasswordTriggered = !isForgotPasswordTriggered);

  const showPasswordHandle = () => ($form.showPassword = !$form.showPassword);

  $: isPasswordIconVisible = $form.password && $form.password.length > 0;
</script>

{#if (typeof $message === "string" || typeof $resetPasswordEmailMessage === "string") && ($message || $resetPasswordEmailMessage)}
  <Toast
    message={$message || $resetPasswordEmailMessage}
    type={$page.status === 200 ? "success" : "error"}
  />
{/if}

<div
  class="min-h-screen flex justify-center items-center"
  in:fly={{ delay: 250, duration: 300, easing: quintOut, x: 100 }}
>
  <div class="card p-5">
    <header class="card-header flex justify-center">
      <Avatar
        src={route("githubAvatar", { avatarId: 159615949 })}
        width="w-20"
      />
    </header>
    <section class="flex flex-col justify-center p-6">
      {#if !isForgotPasswordTriggered}
        <form
          class="space-y-5"
          method="post"
          action={route("login /signin-signup")}
          use:enhance
        >
          <label class="label text-primary-500"
            ><span>Username</span>
            <input
              class="input text-primary-700"
              type="text"
              name="username"
              placeholder="username"
              autocomplete="off"
              aria-invalid={$errors.username ? "true" : undefined}
              bind:value={$form.username}
              {...$constraints.username}
            />
          </label>

          <label class="label text-primary-500"
            ><span>Password</span>
            <div class="input-group grid-cols-[1fr_auto]">
              {#if $form.showPassword}
                <input
                  class="input text-primary-700"
                  type="text"
                  name="password"
                  placeholder="password"
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
                  placeholder="password"
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

          <button
            class="btn variant-filled-tertiary min-w-full font-bold capitalize"
            type="submit"
            >{#if $delayed}
              logging in <Icon
                icon="eos-icons:three-dots-loading"
                width="32"
                height="32"
              />
            {:else}
              login
            {/if}</button
          >
        </form>
      {:else}
        <form
          class="space-y-5"
          method="post"
          action={route("sendResetPasswordEmail /signin-signup")}
          use:resetPasswordEmailEnhance
        >
          <label class="label text-primary-500"
            ><span>Email</span>
            <input
              class="input text-primary-700"
              type="text"
              name="email"
              placeholder="Email"
              autocomplete="off"
              aria-invalid={$resetPasswordEmailErrors.email
                ? "true"
                : undefined}
              bind:value={$resetPasswordEmailForm.email}
              {...$resetPasswordEmailConstraints.email}
            />
          </label>

          <button
            class="btn variant-filled-tertiary min-w-full font-bold capitalize"
            type="submit"
            >{#if $resetPasswordEmailDelayed}
              sending reset link <Icon
                icon="eos-icons:three-dots-loading"
                width="48"
                height="48"
              />
            {:else}
              send reset link
            {/if}
          </button>
        </form>
      {/if}
    </section>
    <footer class="card-footer">
      <div class="flex items-center">
        {#if isForgotPasswordTriggered}
          <span class="text-sm capitalize">remember password?</span>
        {/if}
        <button
          class="btn text-primary-700 hover:text-error-600 text-sm float-left capitalize"
          on:click={handleClick}
          >{!isForgotPasswordTriggered
            ? "forgot password?"
            : "login here"}</button
        >
      </div>
    </footer>
  </div>
</div>
