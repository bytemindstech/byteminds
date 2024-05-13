<script lang="ts">
  // import type { PageData } from './$types';
  import { Statistics } from "$lib/components/ui";

  // export let data: PageData;
</script>

<div class="container mx-auto">
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
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
