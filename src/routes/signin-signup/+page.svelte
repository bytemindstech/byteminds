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

  //login
  const { form, errors, constraints, message, enhance } = superForm(
    data.loginForm,
    {
      resetForm: true,
    },
  );

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
  <Login {form} {errors} {constraints} {message} {enhance} />
{/if}
