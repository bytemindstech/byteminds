<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { Founder } from "./ui";

  const founders = [
    {
      name: "Zaldy",
      imgSrc: route("githubAvatar", { avatarId: 120020713 }),
      position: "Co-founder",
      designation: "CEO",
    },
    {
      name: "Ferds",
      imgSrc: route("githubAvatar", { avatarId: 64579217 }),
      position: "Co-founder",
      designation: "COO",
    },
    {
      name: "Wil",
      imgSrc: route("githubAvatar", { avatarId: 120021268 }),
      position: "Co-founder",
      designation: "CFO",
    },
    {
      name: "Jhenbert",
      imgSrc: route("githubAvatar", { avatarId: 81309377 }),
      position: "Co-founder",
      designation: "CTO",
    },
    {
      name: "Cecel",
      imgSrc:
        "https://images.pexels.com/photos/4542178/pexels-photo-4542178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      position: "Co-founder",
      designation: "CDO",
    },
  ];
</script>

<section class="mb-4">
  <div class="container mx-auto p-5">
    <h2 class="h2 text-center mb-7">The Team</h2>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
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
