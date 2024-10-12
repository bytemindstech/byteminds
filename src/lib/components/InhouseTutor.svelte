<script lang="ts">
  import { InhouseTutorCard } from "./ui";

  export let inhouseTutors: Promise<
    Array<{
      id: string;
      name: string;
      subjectTaught: string;
      bio: string;
      image: string;
    }>
  >;
</script>

<div class="w-full bg-surface-100/65 p-6">
  <h2 class="h2 text-center capitalize my-6 pb-10">meet our in-house tutors</h2>

  {#await inhouseTutors}
    <p class="text-lg font-bold">Loading inhouse tutors please wait....</p>
  {:then inhouseTutors}
    {#if inhouseTutors && inhouseTutors.length > 0}
      {#each inhouseTutors as inhouseTutor (inhouseTutor.id)}
        <InhouseTutorCard
          tutorImg={inhouseTutor.image}
          name={inhouseTutor.name}
          designation={inhouseTutor.subjectTaught}
          bio={inhouseTutor.bio}
        />
      {/each}
    {:else}
      <p class="text-lg semi-bold">
        Be the first to become our in-house tutor — get in touch now!
      </p>
    {/if}
  {/await}
</div>
