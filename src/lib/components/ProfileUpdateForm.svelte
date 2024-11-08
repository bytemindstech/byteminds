<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { page } from "$app/stores";
  import { superForm } from "sveltekit-superforms/client";
  import { Toast } from "./ui";

  interface Props {
    formData: any;
  }

  let { formData }: Props = $props();

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

<div class="mt-5 rounded-lg bg-surface-100 p-6 shadow">
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
          {#each ["tutor"] as role}
            <option value={role}>{role}</option>
          {/each}
        </select>
      </label>

      <div class="mt-4 flex w-full justify-center">
        <button
          class="variant-filled-tertiary btn btn-sm w-full capitalize md:btn-md"
          disabled={$delayed}
        >
          {$delayed ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  </div>
</div>
