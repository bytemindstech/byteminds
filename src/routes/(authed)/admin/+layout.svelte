<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { Navigation } from "$lib/components";
  import { Statistics } from "$lib/components/ui";

  // import type { LayoutData } from './$types';

  import { AppShell } from "@skeletonlabs/skeleton";

  // export let data: LayoutData;

  const paths = [
    { name: "home", route: route("/admin") },
    { name: "tutors", route: route("/admin/tutors") },
    { name: "parents", route: route("/admin/parents") },
    { name: "students", route: route("/admin/students") },
  ];
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4"
  ><svelte:fragment slot="sidebarLeft"><Navigation {paths} /></svelte:fragment>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      <Statistics
        title="Parent's Registered"
        icon="(icon)"
        data="15"
        cardBg="bg-primary-400/40"
      />
      <Statistics
        title="Student's Enrolled"
        icon="(icon)"
        data="25"
        cardBg="bg-secondary-400/40"
      />
      <Statistics
        title="Tutors"
        icon="(icon)"
        data="10"
        cardBg="bg-tertiary-400/40"
      />
      <Statistics
        title="Courses Available"
        icon="(icon)"
        data="6"
        cardBg="bg-success-400/40"
      />
    </div>
  </div>

  <slot />
</AppShell>
