<script lang="ts">
  import { route } from "$lib/ROUTES";
  import { Profile } from "./ui";
</script>

<section>
  <div class="container mx-auto">
    <h2 class="h2 text-center mb-7 mt-16">The Team</h2>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Profile
        name="Rizaldy Britanico"
        imgSrc={route("githubAvatar", { avatarId: 120020713 })}
        position="Co-founder"
        designation="Chief Executive Officer"
      />

      <Profile
        name="Ferdinand Guiang"
        imgSrc={route("githubAvatar", { avatarId: 64579217 })}
        position="Co-founder"
        designation="Chief Operations Officer"
      />

      <Profile
        name="Wil Atienza Jr"
        imgSrc={route("githubAvatar", { avatarId: 120021268 })}
        position="Co-founder"
        designation="Chief Financial Officer"
      />

      <Profile
        name="Jhenbert Villamucho"
        imgSrc={route("githubAvatar", { avatarId: 81309377 })}
        position="Co-founder"
        designation="Chief Technology Officer"
      />

      <Profile
        name="Frederick Del Mar"
        imgSrc={route("githubAvatar", { avatarId: 111483079 })}
        position="Co-founder"
        designation="Chief Marketing Officer"
      />

      <Profile
        name="Segundino Balbuena"
        imgSrc={route("githubAvatar", { avatarId: 120021196 })}
        position="Co-founder"
        designation="Product Director"
      />
    </div>
  </div>
</section>
