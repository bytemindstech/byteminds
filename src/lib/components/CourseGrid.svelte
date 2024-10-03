<script lang="ts">
  type Course = {
    id: string;
    title: string;
    price: number;
    image?: string; // Optional image field
  };
  export let courses: Course[];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
  {#each courses as course (course.id)}
    <slot name="course-card" {course} />
  {/each}
</div>
