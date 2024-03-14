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
            autocomplete="off"
          />
        </label>

        <label class="label">
          <span>Email</span>
          <input
            class="input"
            placeholder="email"
            type="email"
            name="email"
            autocomplete="off"
          />
        </label>

        <label class="label">
          <span>First Name</span>
          <input
            class="input"
            placeholder="First Name"
            type="text"
            name="firstName"
            autocomplete="off"
            autocapitalize="on"
          />
        </label>

        <label class="label">
          <span>Last Name</span>
          <input
            class="input"
            placeholder="Last Name"
            type="text"
            name="lastName"
            autocomplete="off"
            autocapitalize="on"
          />
        </label>

        <label class="label">
          <span>Password</span>
          <input
            class="input"
            placeholder="password"
            type="password"
            name="password"
            autocomplete="off"
          />
        </label>
        <button type="submit" class="btn variant-filled-primary w-full"
          >Register</button
        >
      </form>
    </div>
  </div>
</div>
