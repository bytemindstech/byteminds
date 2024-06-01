<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { Founder } from "./ui";

  const founders = [
    {
      name: "Rizaldy Britanico",
      imgSrc: route("githubAvatar", { avatarId: 120020713 }),
      position: "Co-founder",
      designation: "CEO",
    },
    {
      name: "Ferdinand Guiang",
      imgSrc: route("githubAvatar", { avatarId: 64579217 }),
      position: "Co-founder",
      designation: "COO",
    },
    {
      name: "Wil Atienza Jr",
      imgSrc: route("githubAvatar", { avatarId: 120021268 }),
      position: "Co-founder",
      designation: "CFO",
    },
    {
      name: "Jhenbert Villamucho",
      imgSrc: route("githubAvatar", { avatarId: 81309377 }),
      position: "Co-founder",
      designation: "CTO",
    },
  ];
</script>

<section class="mb-5">
  <div class="container mx-auto p-5">
    <h2 class="h2 text-center mb-7">The Team</h2>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {#each founders as founder}
        <Founder
          name={founder.name}
          imgSrc={founder.imgSrc}
          position={founder.position}
          designation={founder.designation}
        />
      {/each}
    </div>
  </div>
</section>
