<script lang="ts">
  import { page } from "$app/stores";
  import { route } from "$lib/ROUTES";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { Toast } from "./ui";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Icon from "@iconify/svelte";

  export let enhance: any;
  export let form: any;
  export let errors: any;
  export let constraints: any;
  export let message: any;

  const showPasswordHandle = () => ($form.showPassword = !$form.showPassword);
</script>

{#if typeof $message === "string" && $message && $page.status >= 400}
  <Toast message={$message} type="error" />
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
            {#if $form.showPassword}<input
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
              <button type="button" on:click={showPasswordHandle}
                ><Icon
                  icon={$form.showPassword
                    ? "mdi:eye-off-outline"
                    : "mdi:eye-outline"}
                  width="24"
                  height="24"
                /></button
              >
            </div>
          </div>
        </label>
        <button
          class="btn variant-filled-tertiary min-w-full font-bold capitalize"
          type="submit">login</button
        >
      </form>
    </section>
    <footer class="card-footer">
      <a
        class="text-primary-700 hover:text-error-700 text-sm float-left"
        href={route("/")}>Forgot Password?</a
      >
    </footer>
  </div>
</div>
