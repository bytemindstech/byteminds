<script lang="ts">
  import { CourseCard, TutorCard } from "$lib/components/ui";
  import { route } from "$lib/ROUTES";
  import { onMount } from "svelte";
  import { getCourses } from "$lib/util.client";
  import { match } from "ts-pattern";

  import {
    CourseGrid,
    TutorGrid,
    ProfileUpdateForm,
    UserProfile,
    UserProfileLayout,
  } from "$lib/components";

  import type { PageData } from "./$types";
  import type { ServerResponse } from "@jhenbert/fetch";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let tutorsArr: Array<any> = [];
  let user: any = $state();
  let coursesArr: Course[] = $state([]);
  let response: ServerResponse<Course[], Error> = $state({ status: "loading" });

  let name = $derived(`${data.firstName} ${data.lastName}`);
  let tutorArr = $derived(tutorsArr as Tutor[]);

  onMount(async () => {
    const users = await data.users;
    response = await getCourses();

    if (users) {
      tutorsArr = users.filter((user) => user.role === "TUTOR");
      user = users.find((user) => user.id === data.id);
    }

    match(response)
      .with({ status: "success" }, (res) => (coursesArr = res.data))
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
  {#snippet profile()}
    <UserProfile
      {name}
      profileImage={user?.profile?.image}
      email={user?.email}
    />

    {#if user?.role === "USER"}
      <ProfileUpdateForm formData={data.userRoleForm} />
    {/if}
  {/snippet}

  {#snippet courses()}
    <div class="rounded-lg bg-surface-100 p-6 shadow">
      <h3 class="h3 mb-4">Available Courses</h3>
      {#if response.status === "loading"}
        <p class="text-lg font-bold">Loading courses please wait....</p>
      {:else if coursesArr.length > 0}
        <CourseGrid courses={coursesArr}>
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
    </div>
  {/snippet}

  {#snippet tutors()}
    <div class="mt-8 rounded-lg bg-surface-100 p-6 shadow">
      <h3 class="h3 mb-4">Freelance Tutors</h3>
      {#if response.status === "loading"}
        <p class="text-lg font-bold">Loading courses please wait....</p>
      {:else if tutorArr && tutorArr.length > 0}
        <TutorGrid tutors={tutorArr}>
          {#snippet tutorCard({ tutor })}
            <TutorCard
              id={tutor.id}
              avatarImageKey={tutor.profile?.image?.key ?? ""}
              courses={tutor.courses}
              name={`${tutor.firstName} ${tutor.lastName.charAt(0)}.`}
              verified={tutor.isEmailVerified}
            />
          {/snippet}
        </TutorGrid>
      {:else}
        <p class="text-lg font-bold">
          No freelance tutors available yet, stay tuned.
        </p>
      {/if}
    </div>
  {/snippet}
</UserProfileLayout>
