<script lang="ts">
  import img1 from "/src/assets/images/web1.jfif";
  import img2 from "/src/assets/images/web3.jfif";
  import img3 from "/src/assets/images/web5.jfif";
</script>

<section class="py-4 my-14 min-h-screen">
  <div class="container my-5 mx-auto p-5">
    <div class="md:flex md:items-center md:justify-between p-4">
      <div class="md:w-1/2 md:pr-8">
        <h1 class="md:text-6xl text-4xl font-bold mb-7 h1">
          Welcome to our site
        </h1>

        <h5 class="font-light text-xl text-justify mb-7 h5">
          Embark on a journey to start web development with our cutting-edge
          courses and professional services. Unlock the secrets of coding,
          design stunning websites, and launch your career in the digital realm.
        </h5>

        <button class="btn btn-xl variant-filled-primary" type="button"
          >Get Started
        </button>
      </div>

      <div
        class="flex mt-8 space-x-4 items-center justify-center md:w-1/2 md:mt-0 md:relative md:ps-4"
      >
        <img
          src={img1}
          alt="hero-img"
          class="shrink md:absolute md:left-0 md:bottom-0 rounded-lg"
        />
        <img
          src={img2}
          alt="hero-img"
          class="hidden md:block md:absolute md:left-0 md:bottom-0 md:translate-x-full md:translate-y-full rounded-lg"
        />
        <img
          src={img3}
          alt="hero-img"
          class="hidden md:block md:absolute md:left-0 md:bottom-0 md:translate-x-full md:translate-y-1/2 rounded-lg"
        />
      </div>
    </div>
  </div>
</section>

<style>
  .container img:nth-child(1) {
    z-index: 3;
    min-height: 200px;
  }

  .container img:nth-child(2) {
    z-index: 2;
    min-height: 180px;
  }

  .container img:nth-child(3) {
    z-index: 1;
    min-height: 230px;
  }
</style>
