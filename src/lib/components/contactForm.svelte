<script lang="ts">
</script>

<div class="container mx-auto min-h-screen flex justify-center items-center">
  <div class="card lg:w-1/3">
    <div class="flex flex-col justify-center p-5">
      <form class="space-y-5">
        <label class="label"
          ><span>First Name</span>
          <input
            class="input"
            type="text"
            name="firstName"
            placeholder="First Name"
            autocomplete="off"
            autocapitalize="on"
          />
        </label>

        <label class="label"
          ><span>Last Name</span>
          <input
            class="input"
            type="text"
            name="lastName"
            placeholder="Last Name"
            autocomplete="off"
            autocapitalize="on"
          />
        </label>

        <label class="label"
          ><span>Contact Number</span>
          <input
            class="input"
            id="phone"
            type="tel"
            name="phone"
            placeholder="0917-xxx-xxxx"
            autocomplete="off"
            required
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
        <button type="submit" class="btn variant-filled-primary">Submit</button>
      </form>
    </div>
  </div>
</div>
