<script lang="ts">
  import { page } from "$app/stores";
  import { route } from "$lib/ROUTES";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { Toast } from "./ui";
  import image from "$lib/assets/images/logo.webp";

  export let enhance: any;
  export let form: any;
  export let errors: any;
  export let constraints: any;
  export let message: any;
</script>

{#if typeof $message === "string" && $message && $page.status >= 400}
  <Toast message={$message} type="error" />
{/if}
<div class="container flex justify-center items-center h-full">
  <div class="card p-5">
    <header class="card-header flex justify-center">
      <Avatar src={image} width="w-20" />
    </header>
    <section class="flex flex-col justify-center p-6">
      <form class="space-y-5" method="post" use:enhance>
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
        </label>
        <button
          class="btn variant-filled-primary min-w-full font-bold text-white hover:bg-error-700"
          type="submit">Submit</button
        >
      </form>
    </section>
    <footer class="card-footer">
      <a
        class="text-primary-700 hover:text-error-700 text-sm float-left"
        href={route("/")}>Forgot Password?</a
      >
      <a
        class="text-primary-700 hover:text-error-700 text-sm float-right"
        href={route("/register")}>Create Account</a
      >
    </footer>
  </div>
</div>
