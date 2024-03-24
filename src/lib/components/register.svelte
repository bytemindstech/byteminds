<script lang="ts">
  // import { enhance } from "$app/forms";
  export let form: any;
  export let errors: any;
  export let constraints: any;
  export let message: any;
  export let enhance: any;
</script>

<div class="container mx-auto min-h-screen flex justify-center items-center">
  <div class="card lg:w-1/3">
    <div class="flex flex-col justify-center p-6">
      {#if $message}
        <h2>{$message}</h2>
      {/if}
      <form class="space-y-5" method="post" use:enhance>
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
            {...$constraints.usrename}
          />
          {#if $errors.username}
            <span
              ><p class="text-sm text-warning-900">{$errors.username}</p></span
            >
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
            <span><p class="text-sm text-warning-900">{$errors.email}</p></span>
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
            <span
              ><p class="text-sm text-warning-900">{$errors.firstName}</p></span
            >
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
            <span
              ><p class="text-sm text-warning-900">{$errors.lastName}</p></span
            >
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
            <span
              ><p class="text-sm text-warning-900">{$errors.password}</p></span
            >
          {/if}
        </label>
        <button type="submit" class="btn variant-filled-primary w-full"
          >Register</button
        >
      </form>
    </div>
  </div>
</div>
