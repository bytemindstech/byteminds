<script lang="ts">
  import { page } from "$app/stores";
  import { Toast } from "./ui";

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
<div class="container mx-auto flex justify-center items-center min-h-full">
  <div class="card">
    <header class="card-header">
      <h2 class="h2">Sign-up</h2>
    </header>
    <form
      class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6"
      method="post"
      use:enhance
    >
      <label class="label">
        <span>Username</span>
        <input
          class="input"
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

      <label class="label">
        <span>Email</span>
        <input
          class="input"
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

      <label class="label">
        <span>First Name</span>
        <input
          class="input"
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
          <span><p class="text-sm text-error-600">{$errors.firstName}</p></span>
        {/if}
      </label>

      <label class="label">
        <span>Last Name</span>
        <input
          class="input"
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
          <span><p class="text-sm text-error-600">{$errors.lastName}</p></span>
        {/if}
      </label>

      <label class="label">
        <span>Password</span>
        <input
          class="input"
          placeholder="password"
          type="password"
          name="password"
          autocomplete="off"
          aria-invalid={$errors.password ? "true" : undefined}
          bind:value={$form.password}
          {...$constraints.password}
        />
        {#if $errors.password}
          <span><p class="text-sm text-error-600">{$errors.password}</p></span>
        {/if}
      </label>

      <label class="label"
        ><span>Source of Information</span>
        <select
          class="select"
          name="sourceInfo"
          bind:value={$form.sourceInfo}
          {...$constraints.sourceInfo}
        >
          <option value="" selected disabled hidden>Choose one</option>
          {#each ["facebook", "youtube", "tiktok", "search-engine", "others"] as source}
            <option
              value={source}
              selected={$form.sourceInfo === source}
              class="capitalize">{source}</option
            >
          {/each}
        </select>
        {#if $errors.sourceInfo}
          <span><p class="text-sm text-error-600">{$errors.sourceInfo}</p></span
          >
        {/if}
      </label>
      <button type="submit" class="btn variant-filled-primary w-full"
        >Register</button
      >
    </form>
  </div>
</div>
