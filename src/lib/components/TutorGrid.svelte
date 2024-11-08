<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    tutors: Tutor[];
    tutorCard: Snippet<[{ tutor: Tutor }]>;
  }

  let { tutors, tutorCard }: Props = $props();
</script>

<section class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
  {#each tutors as tutor (tutor.id)}
    {@render tutorCard({ tutor })}
  {/each}
</section>
