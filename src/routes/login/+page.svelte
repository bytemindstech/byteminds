<script lang="ts">
  import { Login } from "$lib/components";
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from "./$types";

  export let data: PageData;

  const { form, errors, constraints, message, enhance } = superForm(data.form, {
    resetForm: true,
  });
</script>

<Login {form} {errors} {constraints} {message} {enhance} />
