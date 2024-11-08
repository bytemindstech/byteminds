<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    courses: Course[];
    courseCard: Snippet<[{ course: Course }]>;
  }

  let { courses, courseCard }: Props = $props();
</script>

<div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
  {#each courses as course (course.id)}
    {@render courseCard({ course })}
  {/each}
</div>
