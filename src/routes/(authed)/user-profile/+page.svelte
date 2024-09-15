<script lang="ts">
  import {
    CourseGrid,
    Tutors,
    ProfileUpdateForm,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";
  import { CourseCard } from "$lib/components/ui";
  import { route } from "$lib/ROUTES";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: name = `${data.firstName} ${data.lastName}`;

  $: tutors = data.tutors as Array<{
    id: string;
    profile: { image: string };
    courses: Array<any>;
    firstName: string;
    lastName: string;
    emailVerified: { isEmailVerified: boolean };
  }>;
</script>

<UserProfileLayout>
  <svelte:fragment slot="profile">
    <UserProfile
      {name}
      profileImg={data.user?.profile?.image ?? ""}
      email={data.email}
    />

    {#if !data.user?.role?.isParent && !data.user?.role?.isStudent && !data.user?.role?.isTutor}
      <ProfileUpdateForm formData={data.userRoleForm} />
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="courses"
    ><div class="bg-surface-100 shadow rounded-lg p-6">
      <h3 class="h3 mb-4">Available Courses</h3>
      {#await data.courses}
        <p class="text-lg font-bold">Loading courses please wait....</p>
      {:then courses}
        {#if courses}
          <CourseGrid {courses}
            ><svelte:fragment slot="course-card" let:course>
              <CourseCard
                data={course}
                href={route("/courses/[courseId]", { courseId: course.id })}
              />
            </svelte:fragment>
          </CourseGrid>
        {:else}
          <p class="text-lg font-bold">No courses available yet, stay tuned.</p>
        {/if}
      {/await}
    </div>
  </svelte:fragment>

  <svelte:fragment slot="tutors"
    ><div class="bg-surface-100 shadow rounded-lg p-6 mt-8">
      <h3 class="h3 mb-4">Freelance Tutors</h3>
      {#if tutors}
        <Tutors {tutors} />
      {:else}
        <p class="text-lg font-bold">
          No freelance tutors available yet, stay tuned.
        </p>
      {/if}
    </div>
  </svelte:fragment>
</UserProfileLayout>
