<script>
  import { enhance } from "$app/forms";
</script>

<section>
  <div class="container mx-auto">
    <div class="flex items-center justify-center min-h-screen">
      <form class="flex flex-col space-y-3" method="post" use:enhance>
        <label class="label space-y-3">
          <span>Verify Email</span>
          <input
            class="input"
            type="text"
            name="code"
            placeholder="Enter verification code"
            autocomplete="off"
          />
        </label>
        <button type="submit" class="btn variant-filled-primary">Verify</button>
      </form>
    </div>
  </div>
</section>
