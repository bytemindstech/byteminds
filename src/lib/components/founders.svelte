<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div class="card card-hover p-7">
        <div class="flex flex-col items-center justify-center">
          <h4 class="h4 mb-2 underline">Rizaldy Britanico</h4>
          <Avatar
            src="https://avatars.githubusercontent.com/u/120020713?v=4"
            width="w-[200px]"
          />
          <h5 class="h5 mt-2">Co-founder</h5>
          <p class="text-sm">Front End Web Developer</p>
        </div>
      </div>

      <div class="card card-hover p-7">
        <div class="flex flex-col items-center justify-center">
          <h4 class="h4 mb-2 underline">Jhenbert Villamucho</h4>
          <Avatar
            src="https://avatars.githubusercontent.com/u/81309377?v=4"
            width="w-[200px]"
          />
          <h5 class="h5 mt-2">Co-founder</h5>
          <p class="text-sm">Full Stack Web Developer</p>
        </div>
      </div>
    </div>
  </div>
</section>
