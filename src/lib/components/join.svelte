<script>
  import { route } from "$lib/ROUTES";
</script>

<section>
  <div class="container mx-auto my-10 p-5">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
      <div>
        <dl class="list-dl">
          <dt class="text-xl font-medium">Tutorial Services</dt>
          <dd>English</dd>
          <dd>Math</dd>
          <dd>Algebra</dd>
          <dd>Troginometry</dd>
        </dl>
      </div>

      <div>
        <dl class="list-dl">
          <dt class="text-xl font-medium">Join Our Team</dt>
          <dd>Online Tutors</dd>
        </dl>
      </div>

      <div>
        <dl class="list-dl">
          <dt class="text-xl font-medium">Others</dt>
          <dd><a href={route("/")}>Join as a Freelance Tutor</a></dd>
          <dd><a href={route("/")}>Terms Of Service</a></dd>
          <dd><a href={route("/contact-us")}>Contact Us</a></dd>
        </dl>
      </div>
    </div>
  </div>
</section>
