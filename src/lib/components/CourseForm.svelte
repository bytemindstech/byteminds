<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { page } from "$app/stores";
  import { Toast } from "./ui";
  import { route } from "$lib/ROUTES";

  export let formData;
  export let userId;

  const { form, errors, constraints, message, delayed, enhance } = superForm(
    formData,
    { resetForm: true },
  );
</script>

{#if typeof $message === "string" && $message}
  <Toast message={$message} type={$page.status === 200 ? "success" : "error"} />
{/if}

<form
  class="space-y-6 p-6"
  method="post"
  action={route("addCourse /tutor")}
  use:enhance
>
  <div class="grid grid-cols-6 gap-6">
    <!--getting userId hidden input-->
    <input type="text" name="userId" hidden value={userId} />

    <!-- Form fields go here -->
    <div class="col-span-6 sm:col-span-3">
      <label class="label text-primary-500">
        <span>Course Title</span>
        <input
          class="input text-primary-500"
          type="text"
          placeholder="Course Title (title must not more than 15 characters)"
          name="courseTitle"
          aria-invalid={$errors.courseTitle ? "true" : undefined}
          bind:value={$form.courseTitle}
          {...$constraints.coursetitle}
        />
      </label>
    </div>

    <!-- Image link -->
    <div class="col-span-6 sm:col-span-3">
      <label class="label text-primary-500">
        <span>Course Image URL</span>
        <input
          class="input text-primary-500"
          type="text"
          placeholder="Image full URL (e.g. https://example.com/image/sample-image.jpg)"
          name="courseImage"
          aria-invalid={$errors.courseImage ? "true" : undefined}
          bind:value={$form.courseImage}
        />
      </label>
    </div>

    <!-- Price -->
    <div class="col-span-6 sm:col-span-3">
      <label class="label text-primary-500">
        <span>Price</span>
        <input
          class="input text-primary-500"
          type="number"
          step="0.01"
          placeholder="Price (e.g. 52.99)"
          name="price"
          aria-invalid={$errors.price ? "true" : undefined}
          bind:value={$form.price}
          {...$constraints.price}
        />
      </label>
    </div>

    <!-- Description -->
    <div class="col-span-6">
      <label class="label text-primary-500">
        <span>Course Description</span>
        <textarea
          class="textarea text-primary-500"
          rows="6"
          placeholder="Course description ..."
          name="description"
          aria-invalid={$errors.description ? "true" : undefined}
          bind:value={$form.description}
          {...$constraints.description}
        />
      </label>
    </div>

    <!-- Add Button -->
    <button type="submit" class="btn variant-filled-tertiary"
      >{$delayed ? "Adding course..." : "Add Course"}</button
    >
  </div>
</form>
