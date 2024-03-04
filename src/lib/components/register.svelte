<script>
  import { enhance } from "$app/forms";
</script>

<div class="container mx-auto min-h-screen flex justify-center items-center">
  <div class="card lg:w-1/3">
    <div class="flex flex-col justify-center p-6">
      <form class="space-y-5" method="post" use:enhance>
        <label class="label">
          <span>Username</span>
          <input
            class="input"
            placeholder="username"
            type="text"
            name="username"
          />
        </label>

        <label class="label">
          <span>Email</span>
          <input class="input" placeholder="email" type="email" name="email" />
        </label>

        <label class="label">
          <span>First Name</span>
          <input
            class="input"
            placeholder="First Name"
            type="text"
            name="firstName"
          />
        </label>

        <label class="label">
          <span>Last Name</span>
          <input
            class="input"
            placeholder="Last Name"
            type="text"
            name="lastName"
          />
        </label>

        <label class="label">
          <span>Password</span>
          <input
            class="input"
            placeholder="password"
            type="password"
            name="password"
          />
        </label>
        <button type="submit" class="btn variant-filled-primary w-full"
          >Register</button
        >
      </form>
    </div>
  </div>
</div>

<style>
</style>
