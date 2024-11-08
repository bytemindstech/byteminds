<script lang="ts">
  import type { PageData } from "./$types";
  import { isSignInStore } from "$lib/store";
  import { onDestroy } from "svelte";
  import { Login, Register } from "$lib/components";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let isSignIn: boolean | undefined = $state();

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
