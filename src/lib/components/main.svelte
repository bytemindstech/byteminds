<script lang="ts">
  import htmlcssjs from "/src/assets/images/htmlcssjs.png";
  import onlineTeacher from "/src/assets/images/online-teacher.jpg";
  import Icon from "@iconify/svelte";
</script>

<section
  class="min-h-screen bg-gradient-to-bl from-green-200 via-green-300 to-blue-500 flex items-center"
>
  <div class="container mx-auto p-5">
    <div class="md:flex md:items-center md:justify-center p-4">
      <img
        src={htmlcssjs}
        alt="htmlcssjs-png"
        class="flex-auto max-w-full mx-auto rounded-lg"
      />

      <div class="md:w-1/2 md:pr-8 md:ms-10">
        <div class="md:flex md:flex-col md:items-end mt-5 space-y-3">
          <div class="flex items-center gap-2">
            <Icon
              icon="streamline:code-monitor-1"
              width="56"
              height="56"
              class="dark:text-primary-900"
            />
            <h2 class="h2 dark:text-primary-900">Why study web development?</h2>
          </div>

          <h5 class="h5 text-xl text-justify mt-5 dark:text-primary-900">
            In today's digital age, businesses and organizations of all sizes
            rely heavily on an online presence. This has led to a significant
            demand for skilled web developers who can design, build, and
            maintain websites and web applications.
          </h5>

          <button class="btn variant-filled-primary mt-5" type="submit"
            >Apply now!</button
          >
        </div>
      </div>
    </div>
  </div>
</section>

<section class="min-h-screen flex items-center">
  <div class="container p-4">
    <div class="md:flex md:items-center md:justify-center p-4">
      <div class="md:w-1/2 md:pr-8">
        <div class="md:flex md:items-center mt-5 gap-3 space-y-3">
          <div>
            <div class="flex items-center gap-2 mt-5">
              <Icon
                icon="fluent-mdl2:join-online-meeting"
                width="56"
                height="56"
              />
              <h2 class="h2">Online Learning</h2>
            </div>

            <h5 class="text-lg text-justify mt-5 h5">
              At KodePipz, we also offer online tutorial for kids and adults on
              different subjects. You can pick your preferred teachers or
              tutors. Do you want to check our available teachers/tutors as well
              as the subjects we're currently offering?
            </h5>
            <button class="btn variant-filled-primary mt-5">Signup now!</button>
          </div>
        </div>
      </div>
      <img
        src={onlineTeacher}
        alt="teacher-img"
        class="flex-auto w-1/2 mx-auto rounded-lg"
      />
    </div>
  </div>
</section>

<style>
</style>
