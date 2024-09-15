<script lang="ts">
  import { page } from "$app/stores";
  import { Toast } from "./ui";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { route } from "$lib/ROUTES";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { superForm } from "sveltekit-superforms/client";
  import { PersonPlus } from "$lib/components/icons";
  import Icon from "@iconify/svelte";
  // import SuperDebug from "sveltekit-superforms";

  export let formData;

  const { form, errors, constraints, message, delayed, enhance } = superForm(
    formData,
    {
      resetForm: true,
    },
  );

  const showPasswordHandle = () => ($form.showPassword = !$form.showPassword);

  const showConfirmPasswordHandle = () =>
    ($form.showConfirmPassword = !$form.showConfirmPassword);

  $: isPasswordIconVisible = $form.password && $form.password.length > 0;

  $: isConfirmPassworIconVisible =
    $form.confirmPassword && $form.confirmPassword.length > 0;
</script>

{#if typeof $message === "string" && $message}
  <Toast message={$message} type={$page.status === 200 ? "success" : "error"} />
{/if}
<div
  class="min-h-screen flex justify-center items-center"
  in:fly={{ delay: 250, duration: 300, easing: quintOut, x: 100 }}
>
  <div
    class="max-w-screen-xl m-0 sm:m-10 sm:rounded-lg flex justify-center flex-1 bg-tertiary-100"
  >
    <div class="card w-2/3 p-5">
      <header
        class="card-header flex flex-col items-center justify-center space-y-5"
      >
        <Avatar
          src={route("githubAvatar", { avatarId: 159615949 })}
          width="w-20"
        />
      </header>
      <form
        class="flex flex-col justify-center space-y-4 p-7"
        method="post"
        action={route("register /signin-signup")}
        use:enhance
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <label class="label text-primary-500">
            <span>Username</span>
            <input
              class="input text-primary-700"
              placeholder="Username"
              type="text"
              name="username"
              autocomplete="off"
              aria-invalid={$errors.username ? "true" : undefined}
              bind:value={$form.username}
              {...$constraints.username}
            />
          </label>

          <label class="label text-primary-500">
            <span>Email</span>
            <input
              class="input text-primary-700"
              placeholder="Email"
              type="email"
              name="email"
              autocomplete="off"
              aria-invalid={$errors.email ? "true" : undefined}
              bind:value={$form.email}
              {...$constraints.email}
            />
          </label>

          <label class="label text-primary-500">
            <span>First Name</span>
            <input
              class="input text-primary-700"
              placeholder="First Name"
              type="text"
              name="firstName"
              autocomplete="off"
              autocapitalize="on"
              aria-invalid={$errors.firstName ? "true" : undefined}
              bind:value={$form.firstName}
              {...$constraints.firstName}
            />
          </label>

          <label class="label text-primary-500">
            <span>Last Name</span>
            <input
              class="input text-primary-700"
              placeholder="Last Name"
              type="text"
              name="lastName"
              autocomplete="off"
              autocapitalize="on"
              aria-invalid={$errors.lastName ? "true" : undefined}
              bind:value={$form.lastName}
              {...$constraints.lastName}
            />
          </label>

          <label class="label text-primary-500">
            <span>Password</span>
            <div class="input-group grid-cols-[1fr_auto]">
              {#if $form.showPassword}
                <input
                  class="input text-primary-700"
                  placeholder="Password"
                  type="text"
                  name="password"
                  autocomplete="off"
                  aria-invalid={$errors.password ? "true" : undefined}
                  bind:value={$form.password}
                  {...$constraints.password}
                />
              {:else}
                <input
                  class="input text-primary-700"
                  placeholder="Password"
                  type="password"
                  name="password"
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

          <label class="label text-primary-500">
            <span>Confirm Password</span>
            <div class="input-group grid-cols-[1fr_auto]">
              {#if $form.showConfirmPassword}
                <input
                  class="input text-primary-700"
                  placeholder="Confirm Password"
                  type="text"
                  name="confirmPassword"
                  autocomplete="off"
                  aria-invalid={$errors.confirmPassword ? "true" : undefined}
                  bind:value={$form.confirmPassword}
                  {...$constraints.confirmPassword}
                />
              {:else}
                <input
                  class="input text-primary-700"
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  autocomplete="off"
                  aria-invalid={$errors.confirmPassword ? "true" : undefined}
                  bind:value={$form.confirmPassword}
                  {...$constraints.confirmPassword}
                />
              {/if}
              <div>
                {#if isConfirmPassworIconVisible}
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
        </div>

        <div class="lg:flex space-y-4 gap-4">
          <div class="w-full">
            <label class="label text-primary-500"
              ><span>How did you learn about us?</span>
              <select
                class="select capitalize text-primary-700"
                name="sourceInfo"
                bind:value={$form.sourceInfo}
                {...$constraints.sourceInfo}
              >
                <option value="" disabled hidden>choose</option>
                {#each ["facebook", "youtube", "tiktok", "search-engine", "others"] as source}
                  <option value={source}>{source} </option>
                {/each}
              </select>
            </label>
          </div>
          <div class="flex items-end w-full">
            <button
              type="submit"
              class="btn variant-filled-tertiary font-bold w-full"
            >
              <!--icon-->
              <PersonPlus />

              <span class="flex items-center justify-center ml-3 capitalize"
                >{#if $delayed}
                  signing up <Icon
                    icon="eos-icons:three-dots-loading"
                    width="32"
                    height="32"
                  />
                {:else}
                  sign up
                {/if}
              </span>
            </button>
          </div>
        </div>

        <p class="mt-6 text-xs text-surface-600 text-center">
          I agree to abide by ByteMinds PH's
          <a
            href={route("/tos")}
            class="border-b border-surface-500 border-dotted"
          >
            Terms of Service
          </a>
          and its
          <a
            href={route("/privacy-policy")}
            class="border-b border-surface-500 border-dotted"
          >
            Privacy Policy
          </a>
        </p>
      </form>
    </div>

    <div class="flex-1 bg-tertiary-100 text-center hidden lg:flex">
      <div
        class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-[url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')]"
      ></div>
    </div>
  </div>
</div>
