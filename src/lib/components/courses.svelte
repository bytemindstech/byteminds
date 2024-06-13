<script lang="ts">
  import { CourseCard } from "./ui";
  import { courses } from "$lib/mock.data";
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
  {#each courses as course}
    <CourseCard
      id={course.id}
      imgSrc={course.imgSrc}
      title={course.title}
      
    />
  {/each}
</div>
