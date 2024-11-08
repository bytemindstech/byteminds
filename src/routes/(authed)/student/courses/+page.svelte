<script lang="ts">
  import { CourseGrid } from "$lib/components";
  import { CourseCard } from "$lib/components/ui";
  import { route } from "$lib/ROUTES";
  import { getCourses } from "$lib/util.client";
</script>

<div class="container mx-auto p-6">
  {#await getCourses()}
    <p class="text-lg font-bold">Loading courses please wait....</p>
  {:then response}
    {#if response.status === "success"}
      {#if response.data}
        <CourseGrid courses={response.data}>
          {#snippet courseCard({ course })}
            <CourseCard
              data={course}
              href={route("/courses/[courseId]", { courseId: course.id })}
            />
          {/snippet}
        </CourseGrid>
      {:else}
        <p class="text-lg font-bold">No courses available yet, stay tuned.</p>
      {/if}
    {/if}

    {#if response.status === "error"}
      <p class="text-lg font-bold text-error-500">
        Error encountered, {response.error.message}
      </p>
    {/if}
  {/await}
</div>
