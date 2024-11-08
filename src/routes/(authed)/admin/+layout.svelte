<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { Navigation } from "$lib/components";
  import { Statistics } from "$lib/components/ui";
  import { AppShell } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import { match } from "ts-pattern";

  import Icon from "@iconify/svelte";

  import type { LayoutData } from "./$types";

  interface Props {
    data: LayoutData;
    children?: import("svelte").Snippet;
  }

  let { data, children }: Props = $props();

  const paths = [
    { name: "dashboard", route: route("/admin") },
    { name: "tutors", route: route("/admin/tutors") },
    { name: "parents", route: route("/admin/parents") },
    { name: "students", route: route("/admin/students") },
    { name: "inhouse tutors", route: route("/admin/inhouse-tutors") },
    { name: "courses", route: route("/admin/courses") },
  ];

  let parentCounts = $state(0);
  let studentCounts = $state(0);
  let tutorCounts = $state(0);
  let courseCounts = $state(0);

  onMount(async () => {
    const users = await data.users;
    const courses = await data.courses;

    users.forEach((user) => {
      match(user.role)
        .with("PARENT", () => parentCounts++)
        .with("STUDENT", () => studentCounts++)
        .with("TUTOR", () => tutorCounts++);
    });

    courseCounts = courses.length;
  });
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4 hidden md:block"
  >{#snippet sidebarLeft()}
    <Navigation {paths} />
  {/snippet}
  <div class="container mx-auto">
    <div class="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-4">
      <Statistics
        title="Parents Registered"
        data={parentCounts}
        cardBg="bg-primary-400/40"
        >{#snippet icon()}
          <Icon icon="ri:parent-fill" width="48" height="48" />
        {/snippet}
      </Statistics>

      <Statistics
        title="Students Enrolled"
        data={studentCounts}
        cardBg="bg-secondary-400/40"
        >{#snippet icon()}
          <Icon icon="fluent:people-team-48-filled" width="48" height="48" />
        {/snippet}
      </Statistics>

      <Statistics
        title="Freelance Tutors"
        data={tutorCounts}
        cardBg="bg-tertiary-400/40"
        >{#snippet icon()}
          <Icon icon="mdi:cast-tutorial" width="48" height="48" />
        {/snippet}
      </Statistics>

      <Statistics
        title="Courses Available"
        data={courseCounts}
        cardBg="bg-success-400/40"
        >{#snippet icon()}
          <Icon icon="ic:round-book" width="48" height="48" />
        {/snippet}
      </Statistics>
    </div>
  </div>

  {@render children?.()}
</AppShell>
