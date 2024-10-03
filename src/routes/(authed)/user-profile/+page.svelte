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
  import { onMount } from "svelte";
  import { getCourses } from "$lib/util.client";
  import { match } from "ts-pattern";
  import type { Course } from "@prisma/client";
  import type { PageData } from "./$types";
  import type { ServerResponse } from "@jhenbert/fetch";

  export let data: PageData;

  let tutorsArr: Array<any> = [];
  let user: any;
  let courses: Course[] = [];
  let response: ServerResponse<Course[], Error> = { status: "loading" };

  $: name = `${data.firstName} ${data.lastName}`;

  $: tutors = tutorsArr as Array<{
    id: string;
    profile: { image: string };
    courses: Array<any>;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
  }>;

  onMount(async () => {
    const users = await data.users;
    response = await getCourses();

    if (users) {
      tutorsArr = users.filter((user) => user.role === "TUTOR");
      user = users.find((user) => user.id === data.id);
    }

    match(response)
      .with({ status: "success" }, (res) => (courses = res.data))
      .with({ status: "error" }, (res) =>
        console.error("Error encountered: ", res.error.message),
      )
      .with({ status: "loading" }, () => {
        console.log("loading...");
      })
      .exhaustive();
  });
</script>

<UserProfileLayout>
  <svelte:fragment slot="profile">
    <UserProfile {name} profileImg={user?.profile?.image} email={user?.email} />

    {#if user?.role === "USER"}
      <ProfileUpdateForm formData={data.userRoleForm} />
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="courses"
    ><div class="bg-surface-100 shadow rounded-lg p-6">
      <h3 class="h3 mb-4">Available Courses</h3>
      {#if response.status === "loading"}
        <p class="text-lg font-bold">Loading courses please wait....</p>
      {:else if courses.length > 0}
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
    </div>
  </svelte:fragment>

  <svelte:fragment slot="tutors"
    ><div class="bg-surface-100 shadow rounded-lg p-6 mt-8">
      <h3 class="h3 mb-4">Freelance Tutors</h3>
      {#if response.status === "loading"}
        <p class="text-lg font-bold">Loading courses please wait....</p>
      {:else if tutors && tutors.length > 0}
        <Tutors {tutors} />
      {:else}
        <p class="text-lg font-bold">
          No freelance tutors available yet, stay tuned.
        </p>
      {/if}
    </div>
  </svelte:fragment>
</UserProfileLayout>
