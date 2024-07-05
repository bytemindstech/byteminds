<script lang="ts">
  import Icon from "@iconify/svelte";

  export let email;
  export let phoneNo;
  export let openHrs;
  export let article;
</script>

<div
  class="max-w-screen-lg min-h-screen mx-auto flex items-center justify-center p-5"
>
  <div class="grid grid-cols-1 md:grid-cols-12 border border-tertiary-900/50">
    <div class="bg-tertiary-900 md:col-span-4 p-10 text-surface-50">
      <p class="mt-4 leading-7 font-regular uppercase">contact</p>
      <h2
        class="h2 text-3xl leading-normal font-extrabold tracking-tight capitalize"
      >
        get in <span class="text-tertiary-500">touch</span>
      </h2>
      <p class="mt-4 leading-7 text-surface-100 text-justify whitespace-normal">
        {article}
      </p>

      <div class="flex items-center space-x-2 mt-5">
        <Icon
          icon="lucide:mail"
          width="24"
          height="24"
          class="text-tertiary-500"
        />
        <span class="text-sm">{email}</span>
      </div>
      <div class="flex items-center space-x-2 mt-5">
        <Icon
          icon="lucide:smartphone"
          width="24"
          height="24"
          class="text-tertiary-500"
        />
        <span class="text-sm">{phoneNo}</span>
      </div>
      <div class="flex items-center space-x-2 mt-5">
        <Icon
          icon="lucide:clock"
          width="24"
          height="24"
          class="text-tertiary-500"
        />
        <span class="text-sm uppercase">{openHrs}</span>
      </div>
    </div>
    <form class="md:col-span-8 p-10 bg-surface-200/50">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label block tracking-wide capitalize">
            first name

            <input
              class="input block w-full"
              type="text"
              placeholder="First Name"
              name="firstName"
            /></label
          >
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="label block tracking-wide capitalize">
            last name

            <input
              class="input block w-full"
              type="text"
              placeholder="Last Name"
              name="lastName"
            />
          </label>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="label block tracking-wide capitalize">
            email address
            <input
              class="input block w-full"
              type="email"
              placeholder="Email"
              name="email"
            />
          </label>
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block tracking-wide capitalize">
            your message

            <textarea rows="10" class="textarea block w-full"></textarea></label
          >
        </div>
        <div class="flex justify-between w-full px-3">
          <div class="md:flex md:items-center">
            <label class="label block font-bold">
              <input class="checkbox leading-tight" type="checkbox" />
              <span class="text-sm"> Send me your newsletter! </span>
            </label>
          </div>
          <button
            class="btn variant-filled-tertiary font-bold mt-3 capitalize"
            type="submit"
          >
            send message
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
