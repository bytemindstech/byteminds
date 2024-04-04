<script lang="ts">
  import { route } from "$lib/ROUTES";

  export let enhance: any;
  export let form: any;
  export let errors: any;
  export let constraints: any;
  export let message: any;
</script>

<div class="container mx-auto min-h-screen flex justify-center items-center">
  <div class="card lg:w-1/3">
    <header class="card-header">
      <h2 class="h2">Login</h2>
      {#if $message}
        <p class="text-lg text-error-600">{$message}</p>
      {/if}
    </header>
    <section class="flex min-h-full flex-col justify-center p-5">
      <form class="space-y-5" method="post" use:enhance>
        <label class="label"
          ><span>Username</span>
          <input
            class="input"
            type="text"
            name="username"
            placeholder="username"
            autocomplete="off"
            aria-invalid={$errors.username ? "true" : undefined}
            bind:value={$form.username}
            {...$constraints.username}
          />
        </label>

        <label class="label"
          ><span>Password</span>
          <input
            class="input"
            type="password"
            name="password"
            placeholder="password"
            autocomplete="off"
            aria-invalid={$errors.password ? "true" : undefined}
            bind:value={$form.password}
            {...$constraints.password}
          />
        </label>
        <p class="text-sm">
          Don't have an account yet? <a
            href={route("/register")}
            class="hover:underline">Register</a
          >
        </p>
        <button class="btn variant-filled-primary min-w-full" type="submit"
          >Submit</button
        >
      </form>
    </section>
  </div>
</div>
