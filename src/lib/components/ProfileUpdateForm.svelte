<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { page } from "$app/stores";
  import { superForm } from "sveltekit-superforms/client";
  import { Toast } from "./ui";

  export let formData;

  // Initialize form with superForm and its utilities
  const { form, delayed, message, enhance } = superForm(formData, {
    resetForm: true,
  });

  if ($form.role) {
    $form.role = "";
  }

  // Helper to determine the toast type based on status
  const toastType = $page.status === 200 ? "success" : "error";
</script>

{#if $message}
  <Toast message={$message} type={toastType} />
{/if}

<div class="bg-surface-100 shadow rounded-lg p-6 mt-5">
  <div class="flex flex-col items-center">
    <form method="post" action={route("default /user-profile")} use:enhance>
      <label class="label text-primary-500">
        <span>Which would you prefer to be?</span>
        <select
          class="select capitalize text-primary-700"
          name="role"
          bind:value={$form.role}
        >
          <option value="" disabled hidden>choose</option>
          {#each ["parent", "student", "tutor"] as role}
            <option value={role}>{role}</option>
          {/each}
        </select>
      </label>

      <div class="mt-4 flex justify-center w-full">
        <button
          class="btn btn-sm md:btn-md variant-filled-tertiary w-full capitalize"
          disabled={$delayed}
        >
          {$delayed ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  </div>
</div>
