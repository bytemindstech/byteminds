<script lang="ts">
  import { superForm, type SuperValidated } from "sveltekit-superforms/client";
  import { page } from "$app/stores";
  import { Toast } from "./ui";
  import { route } from "$lib/ROUTES";

  interface Props {
    formData: SuperValidated<{
      name: string;
      subjectTaught: string;
      bio: string;
      image: File;
    }>;
  }

  let { formData }: Props = $props();

  const { form, message, constraints, errors, delayed, enhance } = superForm(
    formData,
    {
      resetForm: true,
    },
  );

  let selectedImage: File | null = null;

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    selectedImage = input.files ? input.files[0] : null;
  };
</script>

{#if typeof $message === "string" && $message}
  <Toast message={$message} type={$page.status === 200 ? "success" : "error"} />
{/if}

<div class="rounded-lg bg-surface-100 p-6 shadow-lg">
  <form
    method="post"
    action={route("create /admin/inhouse-tutors")}
    enctype="multipart/form-data"
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
            type="file"
            name="image"
            accept="image/*"
            aria-invalid={$errors.image ? "true" : undefined}
            bind:value={$form.image}
            onchange={handleFileChange}
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
          ></textarea>
        </label>
      </div>
    </div>
    <button
      type="submit"
      class="variant-filled-tertiary btn mt-4"
      disabled={$delayed}
      >{$delayed ? "Adding In-house Tutor..." : "Add In-house Tutor"}</button
    >
  </form>
</div>
