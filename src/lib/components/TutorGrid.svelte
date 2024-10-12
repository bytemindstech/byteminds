<script lang="ts">
  type Tutor = {
    id: string;
    profile: { image: string };
    courses: Array<any>;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
  };

  export let tutors: Tutor[];
</script>

<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
  {#each tutors as tutor (tutor.id)}
    <slot name="tutor-card" {tutor} />
  {/each}
</section>
