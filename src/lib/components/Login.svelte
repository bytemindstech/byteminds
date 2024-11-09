<script lang="ts">
  import { page } from "$app/stores";
  import { route } from "$lib/ROUTES";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { Toast } from "./ui";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Icon from "@iconify/svelte";
  import { superForm } from "sveltekit-superforms/client";
  import { goto } from "$app/navigation";
  import { isSignInStore } from "$lib/store";
  // import SuperDebug from "sveltekit-superforms";

  interface Props {
    loginFormData: any;
    resetPasswordEmailFormData: any;
  }

  let { loginFormData, resetPasswordEmailFormData }: Props = $props();

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

  let isForgotPasswordTriggered = $state(false);

  const handleClick = () => {
    isForgotPasswordTriggered = !isForgotPasswordTriggered;

    if (isForgotPasswordTriggered) {
      goto("/signin-signup?forgot-password");
    } else {
      goto("/signin-signup?login");
    }
  };

  let isSignIn = false;

  const handleClickRegister = () => {
    isSignIn = !isSignIn;
    isSignInStore.update((value) => !value);

    if (!isSignIn) {
      goto("signin-signup?register");
    } else {
      goto("signin-signup?login");
    }
  };

  const showPasswordHandle = () => ($form.showPassword = !$form.showPassword);

  let isPasswordIconVisible = $derived(
    $form.password && $form.password.length > 0,
  );
</script>

{#if (typeof $message === "string" || typeof $resetPasswordEmailMessage === "string") && ($message || $resetPasswordEmailMessage)}
  <Toast
    message={$message || $resetPasswordEmailMessage}
    type={$page.status === 200 ? "success" : "error"}
  />
{/if}

<div
  class="flex min-h-screen items-center justify-center"
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
                  <button type="button" onclick={showPasswordHandle}
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
            class="variant-filled-tertiary btn min-w-full font-bold capitalize"
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
            class="variant-filled-tertiary btn min-w-full font-bold capitalize"
            type="submit"
            disabled={$resetPasswordEmailDelayed}
            >{#if $resetPasswordEmailDelayed}
              sending reset link <Icon
                icon="eos-icons:three-dots-loading"
                width="32"
                height="32"
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
          type="button"
          class="btn float-left -ml-4 text-sm capitalize text-primary-700 hover:text-error-600"
          onclick={handleClick}
          >{!isForgotPasswordTriggered
            ? "forgot password?"
            : "login here"}</button
        >

        {#if !isForgotPasswordTriggered}
          <p class="text-center text-sm text-surface-600 md:hidden">
            No account yet?
            <button
              type="button"
              class="btn -ml-4 text-sm capitalize text-primary-700 hover:text-error-600"
              onclick={handleClickRegister}
            >
              Register here
            </button>
          </p>
        {/if}
      </div>
    </footer>
  </div>
</div>
