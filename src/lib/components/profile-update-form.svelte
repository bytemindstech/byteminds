<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { page } from "$app/stores";
  import { superForm } from "sveltekit-superforms/client";
  import { Toast } from "./ui";
  //   import SuperDebug from "sveltekit-superforms";

  export let formData;

  const { form, delayed, message, constraints, enhance } = superForm(formData, {
    resetForm: true,
  });
</script>

{#if typeof $message === "string" && $message}
  <Toast message={$message} type={$page.status === 200 ? "success" : "error"} />
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
          {...$constraints.role}
        >
          <option value="" disabled hidden>choose</option>
          {#each ["parent", "student", "tutor"] as role}
            <option value={role}>{role}</option>
          {/each}
        </select>
      </label>

      <div class="mt-4 flex flex-wrap gap-4 justify-center">
        <button
          class="btn btn-sm md:btn-md variant-filled-tertiary w-full capitalize"
          >{$delayed ? "submitting ..." : "submit"}
        </button>
      </div>
    </form>
  </div>
</div>
