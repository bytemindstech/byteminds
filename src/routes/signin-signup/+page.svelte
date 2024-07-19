<script lang="ts">
  import type { PageData } from "./$types";
  import { isSignInStore } from "$lib/store";
  import { onDestroy } from "svelte";
  import { Login, Register } from "$lib/components";

  export let data: PageData;

  let isSignIn: boolean;

  const unsubscribe = isSignInStore.subscribe((value) => {
    isSignIn = value;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

{#if !isSignIn}
  <Register formData={data.registrationForm} />
{:else}
  <Login
    loginFormData={data.loginForm}
    resetPasswordEmailFormData={data.resetPasswordForm}
  />
{/if}
