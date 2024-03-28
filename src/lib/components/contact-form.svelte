<script lang="ts">
</script>

<div class="container mx-auto min-h-screen flex justify-center items-center">
  <div class="card lg:w-1/3">
    <header class="card-header">
      <h2 class="h2">Contact Us</h2>
    </header>
    <section class="flex flex-col justify-center p-5">
      <form class="space-y-5">
        <label class="label"
          ><span>Full Name</span>
          <input
            class="input"
            type="text"
            name="fullName"
            placeholder="Full Name"
            autocomplete="off"
            autocapitalize="on"
          />
        </label>

        <label class="label"
          ><span>Email</span>
          <input
            class="input"
            type="email"
            name="email"
            placeholder="E-mail"
            autocomplete="off"
          />
        </label>

        <label class="label"
          ><span>Message</span>
          <textarea class="textarea" name="message" autocomplete="off" />
        </label>
        <button type="submit" class="btn variant-filled-primary w-full"
          >Send</button
        >
      </form>
    </section>
  </div>
</div>
