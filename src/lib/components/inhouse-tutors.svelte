<script lang="ts">
  import { InhouseTutor } from "./ui";
  import { inhouseTutors } from "$lib/mock.data";
</script>

<div class="w-full bg-surface-100/65 py-8">
  <h2 class="h2 text-center capitalize relative my-8">
    meet our in-house tutors
  </h2>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
    {#each inhouseTutors as inhouseTutor}
      <InhouseTutor
        tutorImg={inhouseTutor.tutorImg}
        name={inhouseTutor.name}
        designation={inhouseTutor.designation}
        bio={inhouseTutor.bio}
      />
    {/each}
  </div>
</div>
