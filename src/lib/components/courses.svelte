<script lang="ts">
  import { CourseCard } from "./ui";

  export let courses;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
  {#each courses as course}
    <CourseCard data={course} />
  {/each}
</div>
