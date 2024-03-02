<script>
  import { enhance } from "$app/forms";
</script>

<div class="container mx-auto min-h-screen flex justify-center items-center">
  <div class="card w-1/3">
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" method="POST" use:enhance>
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
            <input
              class="input"
              placeholder="email"
              type="email"
              name="email"
            />
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
</div>

<style>
</style>
