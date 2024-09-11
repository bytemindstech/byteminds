<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { Navigation } from "$lib/components";
  import { Statistics } from "$lib/components/ui";
  import Icon from "@iconify/svelte";

  import type { LayoutData } from "./$types";

  import { AppShell } from "@skeletonlabs/skeleton";

  export let data: LayoutData;

  const paths = [
    { name: "home", route: route("/admin") },
    { name: "tutors", route: route("/admin/tutors") },
    { name: "parents", route: route("/admin/parents") },
    { name: "students", route: route("/admin/students") },
  ];

  const parentCounts = data.users.filter((user) => user.role?.isParent).length;

  const studentCounts = data.users.filter(
    (user) => user.role?.isStudent,
  ).length;

  const tutorCounts = data.users.filter((user) => user.role?.isTutor).length;
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4"
  ><svelte:fragment slot="sidebarLeft"><Navigation {paths} /></svelte:fragment>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      <Statistics
        title="Parents Registered"
        data={parentCounts}
        cardBg="bg-primary-400/40"
        ><svelte:fragment slot="icon"
          ><Icon
            icon="ri:parent-fill"
            width="48"
            height="48"
          /></svelte:fragment
        >
      </Statistics>

      <Statistics
        title="Students Enrolled"
        data={studentCounts}
        cardBg="bg-secondary-400/40"
        ><svelte:fragment slot="icon"
          ><Icon
            icon="fluent:people-team-48-filled"
            width="48"
            height="48"
          /></svelte:fragment
        >
      </Statistics>

      <Statistics
        title="Tutors Registered"
        data={tutorCounts}
        cardBg="bg-tertiary-400/40"
        ><svelte:fragment slot="icon"
          ><Icon
            icon="mdi:cast-tutorial"
            width="48"
            height="48"
          /></svelte:fragment
        >
      </Statistics>

      <Statistics title="Courses Available" data="6" cardBg="bg-success-400/40"
        ><svelte:fragment slot="icon"
          ><Icon icon="ic:round-book" width="48" height="48" />
        </svelte:fragment>
      </Statistics>
    </div>
  </div>

  <slot />
</AppShell>
