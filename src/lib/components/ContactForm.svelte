<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { page } from "$app/stores";
  import { route } from "$lib/ROUTES";
  import { Toast } from "./ui";
  import Icon from "@iconify/svelte";

  interface Props {
    email: any;
    phoneNo: any;
    article: any;
    formData: any;
  }

  let {
    email,
    phoneNo,
    article,
    formData
  }: Props = $props();

  const { form, errors, constraints, message, delayed, enhance } = superForm(
    formData,
    {
      resetForm: true,
    },
  );
</script>

{#if typeof $message === "string" && $message}
  <Toast message={$message} type={$page.status === 200 ? "success" : "error"} />
{/if}
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
        <span class="text-sm"
          ><a
            href={route("mailTo", { email: email })}
            class="hover:text-tertiary-500">{email}</a
          ></span
        >
      </div>
      <div class="flex items-center space-x-2 mt-5">
        <Icon
          icon="lucide:smartphone"
          width="24"
          height="24"
          class="text-tertiary-500"
        />
        <span class="text-sm"
          ><a
            href={route("callTo", { phoneNo: phoneNo.replace(/\s+/g, "") })}
            class="hover:text-tertiary-500">{phoneNo}</a
          ></span
        >
      </div>
    </div>

    <form
      class="md:col-span-8 p-10 bg-surface-200/50"
      method="post"
      action={route("default /contact-us")}
      use:enhance
    >
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label block tracking-wide capitalize">
            <span>first name</span>
            <input
              class="input block w-full"
              type="text"
              placeholder="First Name"
              name="firstName"
              autocomplete="off"
              aria-invalid={$errors.firstName ? "true" : undefined}
              bind:value={$form.firstName}
              {...$constraints.firstName}
            />
          </label>
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="label block tracking-wide capitalize">
            <span>last name</span>
            <input
              class="input block w-full"
              type="text"
              placeholder="Last Name"
              name="lastName"
              autocomplete="off"
              aria-invalid={$errors.lastName ? "true" : undefined}
              bind:value={$form.lastName}
              {...$constraints.lastName}
            />
          </label>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="label block tracking-wide capitalize">
            <span>email address</span>
            <input
              class="input block w-full"
              type="email"
              placeholder="Email"
              name="email"
              autocomplete="off"
              aria-invalid={$errors.email ? "true" : undefined}
              bind:value={$form.email}
              {...$constraints.email}
            />
          </label>
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block tracking-wide capitalize">
            <span>your message</span>
            <textarea
              rows="10"
              class="textarea block w-full"
              name="message"
              aria-invalid={$errors.message ? "true" : undefined}
              bind:value={$form.message}
              {...$constraints.message}
></textarea>
          </label>
        </div>
        <div class="flex justify-between w-full px-3">
          <div class="md:flex md:items-center">
            <label class="label block font-bold">
              <input
                class="checkbox leading-tight"
                type="checkbox"
                name="isSendNewsLetter"
                aria-invalid={$errors.isSendNewsLetter ? "true" : undefined}
                bind:checked={$form.isSendNewsLetter}
              />
              <span class="text-sm"> Send me your newsletter! </span>
            </label>
          </div>
          <button
            class="btn variant-filled-tertiary font-bold mt-3 capitalize"
            type="submit"
            disabled={$delayed}
          >
            {$delayed ? "sending ..." : "send message"}
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
