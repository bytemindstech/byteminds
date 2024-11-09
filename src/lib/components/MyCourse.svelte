<script lang="ts">
  import defaultCourseImg from "$lib/assets/images/default-course-img.jpg";
  import { page } from "$app/stores";
  import { route } from "$lib/ROUTES";
  import { superForm } from "sveltekit-superforms/client";
  import { Toast } from "./ui";
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";

  import type { SuperValidated } from "sveltekit-superforms/client";

  interface Props {
    courseTitle: string;
    rate: number;
    description: string;
    courseImage?: string;
    courseId: string;

    updateCourseFormData: SuperValidated<{
      courseId: string;
      courseTitle: string;
      price: number;
      description: string;
    }>;
  }

  let {
    courseTitle = $bindable(),
    rate = $bindable(),
    description = $bindable(),
    courseImage = $bindable(defaultCourseImg),
    courseId,
    updateCourseFormData,
  }: Props = $props();

  const modalStore = getModalStore();
  const { errors, constraints, message, delayed, enhance } = superForm(
    updateCourseFormData,
    {
      resetForm: true,
      onUpdated({ form }) {
        if (form.valid) {
          isEdit = false;
        }
      },
    },
  );

  // Fallback image handler
  const handleImageError = (event: Event) => {
    (event.target as HTMLImageElement).src = defaultCourseImg;
  };

  // Edit state
  let isEdit = $state(false);

  const toggleEditMode = (event: Event) => {
    if (!isEdit) {
      // Prevent form submission if not in edit mode
      event.preventDefault();
      isEdit = true; //enable edit mode
    }
  };

  //Cancel edit
  const toggleCancel = () => {
    isEdit = false;
  };

  //delete
  const toggleDelete = () => {
    const modal: ModalSettings = {
      type: "component",
      component: "confirmModal",
      meta: { id: courseId, title: courseTitle },
    };
    // will trigger the modal
    modalStore.trigger(modal);
  };

  // let selectedImage: File | null = null;

  // const handleFileChange = (event: Event) => {
  //   const input = event.target as HTMLInputElement;
  //   selectedImage = input.files ? input.files[0] : null;
  // };
</script>

{#if typeof $message === "string" && $message}
  <Toast message={$message} type={$page.status === 200 ? "success" : "error"} />
{/if}

<div class="py-8">
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <form action={route("updateCourse /tutor")} method="POST" use:enhance>
      <div class="-mx-4 flex flex-col md:flex-row">
        <div class="px-4 md:flex-1">
          <div class="relative mb-4 h-[460px] rounded-lg bg-surface-300">
            <!--Hidden input to pass the value of courseId in the form data.-->
            <input value={courseId} name="courseId" type="hidden" />
            <!--image-->
            <img
              class="h-full w-full object-cover"
              src={courseImage}
              alt="course_image"
              loading="lazy"
              onerror={handleImageError}
            />
            <!-- {#if isEdit}
              <input
                class="input absolute bottom-0 mb-4 w-full text-sm text-surface-600"
                type="file"
                accept="image/*"
                name="courseImage"
                aria-invalid={$errors.courseImage ? "true" : undefined}
                onchange={handleFileChange}
                bind:value={courseImage}
              />
            {/if} -->
          </div>
          <!--button section-->
          <div class="-mx-2 mb-4 flex flex-col md:flex-row">
            <div class="w-1/2 px-2">
              <button
                type={isEdit ? "submit" : "button"}
                class="variant-filled-tertiary btn w-full px-4 py-2 font-bold capitalize"
                onclick={toggleEditMode}
              >
                {isEdit ? ($delayed ? "saving..." : "save") : "edit"}
              </button>
            </div>

            <div class="w-1/2 px-2">
              {#if isEdit}
                <button
                  type="button"
                  class="variant-filled-tertiary btn w-full px-4 py-2 font-bold capitalize"
                  onclick={toggleCancel}
                >
                  cancel
                </button>
              {:else}
                <button
                  type="button"
                  class="variant-filled-tertiary btn w-full px-4 py-2 font-bold capitalize"
                  onclick={toggleDelete}
                >
                  delete
                </button>
              {/if}
            </div>
          </div>
        </div>
        <!--course details-->
        <div class="px-4 md:flex-1">
          <h3 class="h3 font-bold capitalize text-surface-800">Course Title</h3>
          {#if isEdit}
            <input
              class="input mb-4 capitalize text-surface-600"
              type="text"
              name="courseTitle"
              placeholder="Course Title"
              aria-invalid={$errors.courseTitle ? "true" : undefined}
              bind:value={courseTitle}
              {...$constraints.courseTitle}
            />
          {:else}
            <p class="mb-4 capitalize text-surface-600">{courseTitle || 'Untiled Course'}</p>
          {/if}
          <!--price-->
          <div class="mb-4">
            <label class="flex items-center space-x-2 text-surface-700">
              <span class="font-bold">Price:</span>
              {#if isEdit}
                <input
                  class="input w-24"
                  type="number"
                  name="price"
                  placeholder="Price per hour"
                  step="0.01"
                  min="0"
                  aria-invalid={$errors.price ? "true" : undefined}
                  bind:value={rate}
                  {...$constraints.price}
                />
              {:else}
                <span class="text-surface-600">
                  Php {rate ? rate.toFixed(2) : "N/A"}/hr
                </span>
              {/if}
            </label>
          </div>
          <!--description-->
          <div>
            <label class="label text-surface-700">
              <span class="font-bold">Course Description</span>:
              {#if isEdit}
                <textarea
                  class="textarea text-sm text-surface-600"
                  name="description"
                  rows="6"
                  placeholder="Course description..."
                  aria-invalid={$errors.description ? "true" : undefined}
                  bind:value={description}
                  {...$constraints.description}
                ></textarea>
              {:else}
                <p class="mt-2 text-sm text-surface-600">{description}</p>
              {/if}
            </label>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
