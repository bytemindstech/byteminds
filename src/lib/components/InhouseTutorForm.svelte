<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { page } from "$app/stores";
  import { Toast } from "./ui";
  import { route } from "$lib/ROUTES";

  export let formData;

  const { form, message, constraints, errors, delayed, enhance } = superForm(
    formData,
    {
      resetForm: true,
    },
  );
</script>

{#if typeof $message === "string" && $message}
  <Toast message={$message} type={$page.status === 200 ? "success" : "error"} />
{/if}

<div class="bg-surface-100 rounded-lg shadow-lg p-6">
  <form
    method="post"
    action={route("create /admin/inhouse-tutors")}
    use:enhance
  >
    <div class="grid grid-cols-9 gap-4">
      <div class="col-span-full sm:col-span-3">
        <label class="label text-primary-500"
          ><span>Name</span>
          <input
            class="input"
            type="text"
            name="name"
            placeholder="Full Name"
            aria-invalid={$errors.name ? "true" : undefined}
            bind:value={$form.name}
            {...$constraints.name}
          />
        </label>
      </div>

      <div class="col-span-full sm:col-span-3">
        <label class="label text-primary-500"
          ><span>Subject Taught</span>
          <input
            class="input"
            type="text"
            name="subjectTaught"
            placeholder="Subject Taught"
            aria-invalid={$errors.subjectTaught ? "true" : undefined}
            bind:value={$form.subjectTaught}
            {...$constraints.subjectTaught}
          />
        </label>
      </div>

      <div class="col-span-full sm:col-span-3">
        <label class="label text-primary-500"
          ><span>Image</span>
          <input
            class="input"
            type="text"
            name="image"
            placeholder="Full url image link"
            aria-invalid={$errors.image ? "true" : undefined}
            bind:value={$form.image}
            {...$constraints.image}
          />
        </label>
      </div>

      <div class="col-span-full">
        <label class="label text-primary-500"
          ><span>Biography</span>
          <textarea
            class="textarea"
            name="bio"
            rows="4"
            placeholder="Short Biography"
            aria-invalid={$errors.bio ? "true" : undefined}
            bind:value={$form.bio}
            {...$constraints.bio}
          />
        </label>
      </div>
    </div>
    <button type="submit" class="btn variant-filled-tertiary mt-4"
      >{$delayed ? "Adding In-house Tutor..." : "Add In-house Tutor"}</button
    >
  </form>
</div>
