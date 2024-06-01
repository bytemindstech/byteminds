<script lang="ts">
  import { route } from "$lib/ROUTES";
  import Icon from "@iconify/svelte";
  export let year: number;
  export let brand: string;
</script>

<section class="container mx-auto p-7">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-y-3">
    <dl class="list-dl">
      <div class="flex-auto flex-col md:!items-start mt-3">
        <h5 class="h5 ml-4"><a href={route("/")}>&copy {year} {brand}</a></h5>
        <p class="text-sm text-gray-600">
          ByteMinds Inc., A Company Registered in the Philippines
        </p>
        <div>
          <span class="text-md text-gray-600">Follow us:</span>
          <a
            href={route("facebook")}
            target="_blank"
            type="button"
            class="btn-icon hover:variant-soft-primary"
            ><Icon icon="bi:facebook" width="24" height="24" /></a
          >
          <a
            href={route("youtube")}
            target="_blank"
            type="button"
            class="btn-icon hover:variant-soft-primary"
            ><Icon
              icon="entypo-social:youtube-with-circle"
              width="24"
              height="24"
            /></a
          >
          <a
            href={route("tiktok")}
            target="_blank"
            type="button"
            class="btn-icon hover:variant-soft-primary"
            ><Icon icon="mage:tiktok-circle" width="28" height="28" /></a
          >
        </div>
      </div>
    </dl>

    <dl class="list-dl lg:ml-4">
      <div class="flex-auto flex-col md:!items-start">
        <dt class="text-lg font-medium ml-4">Tutorial Services</dt>
        <dd>English</dd>
        <dd>Math</dd>
        <dd>Reading</dd>
      </div>
    </dl>

    <dl class="list-dl lg:ml-4">
      <div class="flex-auto flex-col md:!items-start">
        <dt class="text-lg font-medium ml-4">Join Our Team</dt>
        <dd>In-house Tutor</dd>
        <dd>Freelance Tutor</dd>
      </div>
    </dl>

    <dl class="list-dl lg:ml-4">
      <div class="flex-auto flex-col md:!items-start">
        <dt class="text-lg font-medium ml-4">Other Links</dt>
        <dd>
          <a class="hover:underline underline-offset-2" href={route("/")}
            >Terms Of Service</a
          >
        </dd>
        <dd>
          <a class="hover:underline underline-offset-2" href={route("/")}
            >Privacy Policy</a
          >
        </dd>
        <dd>
          <a
            class="hover:underline underline-offset-2"
            href={route("/contact-us")}>Contact Us</a
          >
        </dd>
      </div>
    </dl>
  </div>
</section>
