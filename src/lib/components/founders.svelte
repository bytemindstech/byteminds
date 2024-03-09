<script lang="ts">
  import { Profile } from ".";
</script>

<section>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10">
      <div class="card">
        <header class="card-header"><h2 class="h2">Our Mission</h2></header>

        <section class="p-4">
          <p class="text-xl font-medium">
            Our mission is to help students to learn and get additional help
            from our partner online teachers and tutors.
          </p>
        </section>
      </div>

      <div class="card">
        <header class="card-header"><h2 class="h2">Our Vision</h2></header>
        <section class="p-4">
          <p class="text-xl font-medium">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum
            aperiam culpa doloremque placeat provident deserunt beatae neque,
            modi sed magni consequatur dolorem minima ad est quaerat, eaque
            tenetur nemo facere.
          </p>
        </section>
      </div>
    </div>

    <h2 class="h2 text-center mb-7 mt-16">The Team</h2>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Profile
        name="Rizaldy Britanico"
        imgSrc="https://avatars.githubusercontent.com/u/120020713?v=4"
        position="Co-founder"
        designation="Front End Web Developer"
      />
      <Profile
        name="Jhenbert Villamucho"
        imgSrc="https://avatars.githubusercontent.com/u/81309377?v=4"
        position="Co-founder"
        designation="Full Stack Web Developer"
      />
      <Profile
        name="Frederick Del Mar"
        imgSrc="https://avatars.githubusercontent.com/u/111483079?v=4"
        position="Co-founder"
        designation="Full Stack Web Developer"
      />

      <Profile
        name="Will Atienza"
        imgSrc="https://avatars.githubusercontent.com/u/120021268?v=4"
        position="Co-founder"
        designation="Business Relations for ByteMinds"
      />

      <Profile
        name="Segundino Balbuena"
        imgSrc="https://avatars.githubusercontent.com/u/120021196?v=4"
        position="Co-founder"
        designation="Full Stack Web Developer"
      />

      <Profile
        name="Ferdinand Guiang"
        imgSrc="https://avatars.githubusercontent.com/u/64579217?v=4"
        position="Co-founder"
        designation="Full Stack Web Developer"
      />
    </div>
  </div>
</section>
