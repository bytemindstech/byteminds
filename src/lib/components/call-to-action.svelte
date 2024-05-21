<script lang="ts">
  import { route } from "$lib/ROUTES";
  import onlineTeacher from "$lib/assets/images/online-teacher.jpg";
  import Icon from "@iconify/svelte";
</script>

<section class="min-h-screen flex items-center">
  <div class="container mx-auto p-5">
    <div class="lg:flex lg:items-center lg:justify-center p-4">
      <div class="lg:w-1/2 p-4">
        <div class="lg:flex lg:flex-col lg:items-start space-y-3">
          <div class="flex flex-auto items-center gap-2">
            <Icon icon="material-symbols:wifi" width="56" height="56" />
            <h2 class="h2">100% Online</h2>
          </div>

          <article class="lg:text-lg text-justify">
            At ByteMinds, we also offer online tutorials for kids and adults on
            different subjects. You can choose your preferred teacher or tutor.
            Would you like to explore our available teachers/tutors as well as
            the subjects we're currently offering?
          </article>
          <a class="btn variant-filled-primary" href={route("/register")}
            >Signup now!</a
          >
        </div>
      </div>
      <img src={onlineTeacher} alt="teacher-img" class="flex-1 rounded-lg" />
    </div>
  </div>
</section>
