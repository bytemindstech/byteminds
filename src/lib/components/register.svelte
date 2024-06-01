<script lang="ts">
  import { page } from "$app/stores";
  import { Toast } from "./ui";
  import { Avatar } from "@skeletonlabs/skeleton";
  import image from "$lib/assets/images/logo.webp";
  import { route } from "$lib/ROUTES";

  export let form: any;
  export let errors: any;
  export let constraints: any;
  export let message: any;
  export let enhance: any;
</script>

{#if typeof $message === "string" && $message}
  {#if $page.status === 200}
    <Toast message={$message} type="success" />
  {:else}
    <Toast message={$message} type="error" />
  {/if}
{/if}
<div class="min-h-screen flex justify-center">
  <div
    class="max-w-screen-xl m-0 sm:m-10 sm:rounded-lg flex justify-center flex-1"
  >
    <div class="card p-5">
      <header
        class="card-header flex flex-col items-center justify-center space-y-5"
      >
        <Avatar src={image} width="w-24" />
        <h2 class="h2 text-center text-primary-900">Sign-up</h2>
      </header>
      <form
        class="flex flex-col justify-center space-y-4 p-7"
        method="post"
        use:enhance
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <label class="label text-primary-500">
            <span>Username</span>
            <input
              class="input text-primary-700"
              placeholder="username"
              type="text"
              name="username"
              autocomplete="off"
              aria-invalid={$errors.username ? "true" : undefined}
              bind:value={$form.username}
              {...$constraints.username}
            />
            {#if $errors.username}
              <span
                ><p class="text-sm text-error-600">
                  {$errors.username}, username must contain number
                </p>
              </span>
            {/if}
          </label>

          <label class="label text-primary-500">
            <span>Email</span>
            <input
              class="input text-primary-700"
              placeholder="email"
              type="email"
              name="email"
              autocomplete="off"
              aria-invalid={$errors.email ? "true" : undefined}
              bind:value={$form.email}
              {...$constraints.email}
            />
            {#if $errors.email}
              <span><p class="text-sm text-error-600">{$errors.email}</p></span>
            {/if}
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
            {#if $errors.firstName}
              <span
                ><p class="text-sm text-error-600">{$errors.firstName}</p></span
              >
            {/if}
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
            {#if $errors.lastName}
              <span
                ><p class="text-sm text-error-600">{$errors.lastName}</p></span
              >
            {/if}
          </label>

          <label class="label text-primary-500">
            <span>Password</span>
            <input
              class="input text-primary-700"
              placeholder="password"
              type="password"
              name="password"
              autocomplete="off"
              aria-invalid={$errors.password ? "true" : undefined}
              bind:value={$form.password}
              {...$constraints.password}
            />
            {#if $errors.password}
              <span
                ><p class="text-sm text-error-600">{$errors.password}</p></span
              >
            {/if}
          </label>

          <label class="label text-primary-500"
            ><span>Source of Information</span>
            <select
              class="select text-primary-700"
              name="sourceInfo"
              bind:value={$form.sourceInfo}
              {...$constraints.sourceInfo}
            >
              <option value="" selected disabled hidden>Choose one</option>
              {#each ["facebook", "youtube", "tiktok", "search-engine", "others"] as source}
                <option
                  value={source}
                  selected={$form.sourceInfo === source}
                  class="capitalize text-primary-700">{source}</option
                >
              {/each}
            </select>
            {#if $errors.sourceInfo}
              <span
                ><p class="text-sm text-error-600">
                  {$errors.sourceInfo}
                </p></span
              >
            {/if}
          </label>
        </div>
        <button
          type="submit"
          class="btn variant-filled-primary !font-semibold text-white hover:bg-error-700"
          ><svg
            class="w-6 h-6 -ml-2"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6M23 11h-6" />
          </svg><span class="ml-3">Sign Up</span></button
        >
        <p class="mt-6 text-xs text-gray-600 text-center">
          I agree to abide by ByteMinds PH's
          <a href={route("/")} class="border-b border-gray-500 border-dotted">
            Terms of Service
          </a>
          and its
          <a href={route("/")} class="border-b border-gray-500 border-dotted">
            Privacy Policy
          </a>
        </p>
      </form>
    </div>

    <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
      <div
        class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
        style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');"
      ></div>
    </div>
  </div>
</div>
