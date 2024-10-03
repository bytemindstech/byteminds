<script lang="ts">
  import { TutorCard } from "$lib/components/ui";

  export let tutors: Array<{
    id: string;
    profile: { image: string };
    courses: Array<any>;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
  }>;
</script>

<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
  {#each tutors as tutor (tutor.id)}
    <TutorCard
      id={tutor.id}
      avatarImg={tutor.profile?.image}
      courses={tutor.courses}
      name={`${tutor.firstName} ${tutor.lastName.charAt(0)}.`}
      verified={tutor.isEmailVerified}
    />
  {/each}
</section>
