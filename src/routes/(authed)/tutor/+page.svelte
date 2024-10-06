<script lang="ts">
  import { CourseForm, CourseGrid } from "$lib/components";
  import { CourseCard } from "$lib/components/ui";
  import { route } from "$lib/ROUTES";
  import { onDestroy } from "svelte";
  import type { PageData } from "./$types";
  import { resetTitle } from "$lib/util.client";

  export let data: PageData;

  $: showForm = false;

  const showFormHandler = () => {
    showForm = !showForm;
  };

  onDestroy(() => resetTitle(data.meta.title));
</script>

<svelte:head><title>{data.title}</title></svelte:head>

<div class="min-h-screen">
  <div class="flex flex-row pt-24 px-10 pb-4">
    <div class="w-full">
      <div class="flex flex-row">
        <div
          class="bg-no-repeat bg-error-200 border border-error-300 rounded-xl w-7/12 mr-2 p-6"
        >
          <p class="text-5xl text-primary-900">
            Welcome <br /><strong>{data.firstName} {data.lastName}</strong>
          </p>
          <span class="inline-block mt-12 py-2"
            ><button class="btn variant-filled-error" on:click={showFormHandler}
              >{showForm ? "Show courses" : "Add course"}</button
            ></span
          >
        </div>

        <div
          class="bg-no-repeat bg-tertiary-200 border border-tertiary-300 rounded-xl w-5/12 ml-2 p-6"
        >
          <p class="text-5xl text-primary-900">
            Students Booked <br /><strong>(23) - Not yet real data</strong>
          </p>
        </div>
      </div>

      <div class="mt-4">
        {#if showForm}
          <div class="bg-surface-100 rounded-xl shadow-lg px-6 py-4 w-full">
            <CourseForm formData={data.courseForm} userId={data.id} />
            <!--data.id is from +layout.server.ts-->
          </div>
        {:else if data.myCourses && data.myCourses.length > 0}
          <!--grid layout-->
          <CourseGrid courses={data.myCourses}>
            <svelte:fragment slot="course-card" let:course
              ><CourseCard
                data={course}
                href={route("/tutor/my-courses/[id]", { id: course.id })}
              /></svelte:fragment
            >
          </CourseGrid>
        {:else}
          <p class="text-lg font-bold text-center">No course added yet</p>
        {/if}
      </div>
    </div>
  </div>
</div>
