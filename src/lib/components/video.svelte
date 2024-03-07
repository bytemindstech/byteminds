<script lang="ts">
  let videoSource = "/src/assets/videos/video.mp4";
</script>

<section class="min-h-screen flex items-center">
  <div class="container mx-auto p-5">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <video controls>
        <source type="video/mp4" src={videoSource} />
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>

      <div class="flex flex-col justify-center items-end space-y-7">
        <h2 class="h2">
          Embark on Your Coding Odyssey: Join Our Web Development Bootcamp
          Today!
        </h2>

        <h5 class="h5 text-justify">
          Are you ready to take the leap into the dynamic world of web
          development? If you're passionate about creating innovative websites
          and applications, our Web Development Bootcamp is the perfect
          launchpad for your coding journey. Brace yourself for an immersive
          learning experience that will not only equip you with the latest
          industry skills but also transform you into a proficient and
          sought-after web developer.
        </h5>
        <div>
          <a href="/contact-us" class="btn variant-filled-primary">Talk to Us</a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  video {
    width: 630px;
    height: 400px;
  }
</style>
