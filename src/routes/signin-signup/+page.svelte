<script lang="ts">
  import type { PageData } from "./$types";
  import { isSignInStore } from "$lib/store";
  import { onDestroy } from "svelte";
  import { Login, Register } from "$lib/components";
  import { superForm } from "sveltekit-superforms/client";

  export let data: PageData;

  let isSignIn: boolean;

  const unsubscribe = isSignInStore.subscribe((value) => {
    isSignIn = value;
  });

  onDestroy(() => {
    unsubscribe();
  });

  //registration
  const {
    form: registrationForm,
    errors: registrationErrors,
    constraints: registrationsConstraints,
    message: registrationMessage,
    enhance: registrationEnhance,
  } = superForm(data.registrationForm, { resetForm: true });
</script>

{#if !isSignIn}
  <Register
    form={registrationForm}
    errors={registrationErrors}
    constraints={registrationsConstraints}
    message={registrationMessage}
    enhance={registrationEnhance}
  />
{:else}
  <Login
    loginFormData={data.loginForm}
    resetPasswordEmailFormData={data.resetPasswordForm}
  />
{/if}
