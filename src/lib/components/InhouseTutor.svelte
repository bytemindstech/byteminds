<script lang="ts">
  import { InhouseTutorCard } from "./ui";

  interface Props {
    inhouseTutors: Promise<
      Array<{
        id: string;
        name: string;
        subjectTaught: string;
        bio: string;
        image: { id: string; key: string; inHouseTutorId: string };
      }>
    >;
  }

  let { inhouseTutors }: Props = $props();
</script>

<div class="w-full bg-surface-100/65 p-6">
  <h2 class="h2 my-6 pb-10 text-center capitalize">meet our in-house tutors</h2>

  {#await inhouseTutors}
    <p class="text-lg font-bold">Loading inhouse tutors please wait....</p>
  {:then inhouseTutors}
    {#if inhouseTutors && inhouseTutors.length > 0}
      {#each inhouseTutors as inhouseTutor (inhouseTutor.id)}
        <InhouseTutorCard data={inhouseTutor} />
      {/each}
    {:else}
      <p class="semi-bold text-lg">
        Be the first to become our in-house tutor — get in touch now!
      </p>
    {/if}
  {/await}
</div>
