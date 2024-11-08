<script lang="ts">
  import { CourseForm, CourseGrid } from "$lib/components";
  import { CourseCard } from "$lib/components/ui";
  import { route } from "$lib/ROUTES";
  import { onDestroy } from "svelte";
  import { resetTitle } from "$lib/util.client";

  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let showForm = $state(false);

  const showFormHandler = () => {
    showForm = !showForm;
  };

  onDestroy(() => resetTitle(data.meta.title));
</script>

<svelte:head><title>{data.title}</title></svelte:head>

<div class="min-h-screen">
  <div class="flex flex-row px-10 pb-4 pt-24">
    <div class="w-full">
      <div class="flex flex-row">
        <div
          class="mr-2 w-7/12 rounded-xl border border-error-300 bg-error-200 bg-no-repeat p-6"
        >
          <p class="text-5xl text-primary-900">
            Welcome <br /><strong>{data.firstName} {data.lastName}</strong>
          </p>
          <span class="mt-12 inline-block py-2"
            ><button class="variant-filled-error btn" onclick={showFormHandler}
              >{showForm ? "Show courses" : "Add course"}</button
            ></span
          >
        </div>

        <div
          class="ml-2 w-5/12 rounded-xl border border-tertiary-300 bg-tertiary-200 bg-no-repeat p-6"
        >
          <p class="text-5xl text-primary-900">
            Students Booked <br /><strong>(23) - Not yet real data</strong>
          </p>
        </div>
      </div>

      <div class="mt-4">
        {#if showForm}
          <div class="w-full rounded-xl bg-surface-100 px-6 py-4 shadow-lg">
            <CourseForm formData={data.courseForm} userId={data.id} />
            <!--data.id is from +layout.server.ts-->
          </div>
        {:else if data.myCourses && data.myCourses.length > 0}
          <!--grid layout-->
          <CourseGrid courses={data.myCourses}>
            {#snippet courseCard({ course })}
              <CourseCard
                data={course}
                href={route("/tutor/my-courses/[id]", { id: course.id })}
              />
            {/snippet}
          </CourseGrid>
        {:else}
          <p class="text-center text-lg font-bold">No course added yet</p>
        {/if}
      </div>
    </div>
  </div>
</div>
