<script>
  import { route } from "$lib/ROUTES";
  import Icon from "@iconify/svelte";
</script>

<section>
  <div class="container mx-auto my-10 p-5">
    <div class="grid grid-cols-1 lg:grid-cols-4 space-y-4">
      <dl class="list-dl">
        <div class="flex-col items-start">
          <dt class="text-xl font-medium">Tutorial Services</dt>
          <dd>English</dd>
          <dd>Math</dd>
        </div>
      </dl>

      <dl class="list-dl">
        <div class="flex-col">
          <dt class="text-xl font-medium">Join Our Team</dt>
          <dd>Online Tutors</dd>
        </div>
      </dl>

      <dl class="list-dl">
        <div class="flex-col">
          <dt class="text-xl font-medium">Social Media</dt>
          <div>
            <dd>
              <a
                href={route("facebook")}
                target="_blank"
                type="button"
                class="btn-icon hover:variant-soft-primary"
                ><Icon icon="bi:facebook" width="32" height="32" /></a
              >
            </dd>
            <dd>
              <a
                href={route("youtube")}
                target="_blank"
                type="button"
                class="btn-icon hover:variant-soft-primary"
                ><Icon
                  icon="entypo-social:youtube-with-circle"
                  width="32"
                  height="32"
                /></a
              >
            </dd>
          </div>
        </div>
      </dl>

      <dl class="list-dl">
        <div class="flex-col">
          <dt class="text-xl font-medium">Other Links</dt>
          <dd><a href={route("/")}>Terms Of Service</a></dd>
          <dd><a href={route("/contact-us")}>Contact Us</a></dd>
        </div>
      </dl>
    </div>
  </div>
</section>
