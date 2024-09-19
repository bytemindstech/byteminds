<script lang="ts">
  import defaultCourseImg from "$lib/assets/images/default-course-img.jpg";
  import { page } from "$app/stores";
  import { route } from "$lib/ROUTES";
  import { superForm } from "sveltekit-superforms/client";
  import type { SuperValidated } from "sveltekit-superforms/client";
  import { Toast } from "./ui";

  export let courseTitle: string;
  export let rate: number;
  export let description: string;
  export let courseImg: string = defaultCourseImg;
  export let courseId: string;
  export let updateCourseFormData: SuperValidated<{
    courseId: string;
    courseTitle: string;
    price: number;
    description: string;
    courseImage: string;
  }>;
  export let deleteCourseFormData: SuperValidated<{ courseId: string }>;

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

  const { delayed: deleteCourseFormDelayed, enhance: deleteCourseFormEnhance } =
    superForm(deleteCourseFormData, {
      resetForm: true,
    });

  // Fallback image handler
  const handleImageError = (event: Event) => {
    (event.target as HTMLImageElement).src = defaultCourseImg;
  };

  // Edit state
  let isEdit = false;

  const toggleEditMode = (event: Event) => {
    if (!isEdit) {
      // Prevent form submission if not in edit mode
      event.preventDefault();
      isEdit = true; //enable edit mode
    }
  };

  //Cancel edit
  const toggleCancelOrDelete = (event: Event) => {
    if (isEdit) {
      console.log("delete form not submiting");
      event.preventDefault();
      isEdit = false;
    }
  };
</script>

{#if typeof $message === "string" && $message}
  <Toast message={$message} type={$page.status === 200 ? "success" : "error"} />
{/if}

<div class="py-8">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <form action={route("updateCourse /tutor")} method="post" use:enhance>
      <div class="flex flex-col md:flex-row -mx-4">
        <div class="md:flex-1 px-4">
          <div class="h-[460px] rounded-lg bg-surface-300 mb-4 relative">
            <!--Hidden input to pass the value of courseId in the form data.-->
            <input value={courseId} name="courseId" type="hidden" />
            <!--image-->
            <img
              class="w-full h-full object-cover"
              src={courseImg}
              alt="course_image"
              loading="lazy"
              on:error={handleImageError}
            />
            {#if isEdit}
              <input
                class="input text-sm text-surface-600 mb-4 absolute bottom-0 w-full"
                type="text"
                name="courseImage"
                placeholder="Image full URL"
                aria-invalid={$errors.courseImage ? "true" : undefined}
                bind:value={courseImg}
              />
            {/if}
          </div>
          <!--button section-->
          <div class="flex flex-col md:flex-row -mx-2 mb-4">
            <div class="w-1/2 px-2">
              <button
                type={isEdit ? "submit" : "button"}
                class="btn variant-filled-tertiary w-full py-2 px-4 font-bold capitalize"
                on:click={toggleEditMode}
              >
                {isEdit ? ($delayed ? "saving..." : "save") : "edit"}
              </button>
            </div>

            <div class="w-1/2 px-2">
              <form
                method="post"
                action={route("deleteCourse /tutor")}
                use:deleteCourseFormEnhance
                class="w-full"
              >
                <!--hidden input-->
                <input type="hidden" name="courseId" value={courseId} />
                <button
                  type={!isEdit ? "submit" : "button"}
                  class="btn variant-filled-tertiary w-full py-2 px-4 font-bold capitalize"
                  on:click={toggleCancelOrDelete}
                >
                  {!isEdit
                    ? $deleteCourseFormDelayed
                      ? "deleting..."
                      : "delete"
                    : "cancel"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <!--course details-->
        <div class="md:flex-1 px-4">
          <h3 class="h3 font-bold text-surface-800 capitalize">Course Title</h3>
          {#if isEdit}
            <input
              class="input text-surface-600 mb-4 capitalize"
              type="text"
              name="courseTitle"
              placeholder="Course Title"
              aria-invalid={$errors.courseTitle ? "true" : undefined}
              bind:value={courseTitle}
              {...$constraints.courseTitle}
            />
          {:else}
            <p class="text-surface-600 mb-4 capitalize">{courseTitle}</p>
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
                  class="textarea text-surface-600 text-sm"
                  name="description"
                  rows="6"
                  placeholder="Course description..."
                  aria-invalid={$errors.description ? "true" : undefined}
                  bind:value={description}
                  {...$constraints.description}
                />
              {:else}
                <p class="text-surface-600 text-sm mt-2">{description}</p>
              {/if}
            </label>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
