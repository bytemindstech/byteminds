<script>
  import { enhance } from "$app/forms";
</script>

<div class="container mx-auto min-h-screen flex justify-center items-center">
  <div class="card lg:w-1/3">
    <div class="flex min-h-full flex-col justify-center px-6 py-8">
      <h3 class="h3 mb-5">Login</h3>
      <form class="space-y-5" method="post" use:enhance>
        <label class="label"
          ><span>Username</span>
          <input
            class="input"
            type="text"
            name="username"
            placeholder="username"
            required
          /></label
        >

        <label class="label"
          ><span>Password</span>
          <input
            class="input"
            type="password"
            name="password"
            placeholder="password"
            required
          /></label
        >
        <p class="text-sm">
          Don't have an account yet? <a href="/register" class="hover:underline"
            >Register</a
          >
        </p>
        <button class="btn variant-filled-primary min-w-full" type="submit"
          >Submit</button
        >
      </form>
    </div>
  </div>
</div>
