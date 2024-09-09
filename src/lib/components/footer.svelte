<script lang="ts">
  import { route } from "$lib/ROUTES";
  import Icon from "@iconify/svelte";
  import { Avatar } from "@skeletonlabs/skeleton";

  const products = ["learning hub", "web development bootcamp", "coaching"];

  const links = [
    { route: route("/about"), name: "about us" },
    { route: route("/tos"), name: "terms & conditions" },
    { route: route("/privacy-policy"), name: "privacy policy" },
    { route: route("/contact-us"), name: "contact us" },
  ];

  export let year: number;
  export let brand: string;
</script>

<footer>
  <div class="bg-surface-800 py-4 text-surface-300">
    <div class="container px-4 mx-auto">
      <div class="-mx-4 flex flex-wrap justify-between">
        <div class="px-4 my-4 w-full xl:w-1/4">
          <a href="/" class="flex flex-wrap items-center gap-3 w-64 md:mb-4">
            <!-- ByteMinds Logo -->
            <Avatar
              src={route("githubAvatar", { avatarId: 159615949 })}
              width="w-12"
            />
            <h3 class="h3">{brand}</h3>
          </a>
          <p class="whitespace-normal">
            {brand} Inc., A Company Registered in the Philippines
          </p>
        </div>

        <div class="px-4 my-4 w-full sm:w-auto">
          <div>
            <h3 class="h3 inline-block pb-4 mb-4 border-b-4 border-primary-600">
              Company
            </h3>
          </div>
          <ul class="leading-8">
            {#each links as link}
              <li>
                <a href={link.route} class="capitalize hover:text-primary-400"
                  >{link.name}</a
                >
              </li>
            {/each}
          </ul>
        </div>

        <div class="px-4 my-4 w-full sm:w-auto">
          <div>
            <h3 class="h3 inline-block pb-4 mb-4 border-b-4 border-primary-600">
              Products / Services
            </h3>
          </div>
          <ul class="leading-8">
            {#each products as product}
              <li class="capitalize">{product}</li>
            {/each}
          </ul>
        </div>

        <div class="px-4 my-4 w-full sm:w-auto xl:w-1/5">
          <div>
            <h3 class="h3 inline-block pb-4 mb-4 border-b-4 border-primary-600">
              Connect With Us
            </h3>
          </div>
          <!-- facebook -->
          <a
            href={route("facebook")}
            class="inline-flex items-center justify-center h-8 w-8 border border-surface-100 rounded-full mr-1 hover:text-primary-400 hover:border-primary-400"
          >
            <Icon icon="mdi:facebook" width="24" height="24" />
          </a>

          <!-- youtube -->
          <a
            href={route("youtube")}
            class="inline-flex items-center justify-center h-8 w-8 border border-surface-100 rounded-full mr-1 hover:text-primary-400 hover:border-primary-400"
          >
            <Icon icon="mdi:youtube" width="24" height="24" />
          </a>

          <!-- linkedin -->
          <a
            href={route("linkedin")}
            class="inline-flex items-center justify-center h-8 w-8 border border-surface-100 rounded-full mr-1 hover:text-primary-400 hover:border-primary-400"
          >
            <Icon icon="mdi:linkedin" width="24" height="24" />
          </a>

          <!-- tiktok -->
          <a
            href={route("tiktok")}
            class="inline-flex items-center justify-center h-8 w-8 border border-surface-100 rounded-full mr-1 hover:text-primary-400 hover:border-primary-400"
          >
            <Icon icon="ic:round-tiktok" width="24" height="24" />
          </a>

          <!-- instagram -->
          <a
            href={route("instagram")}
            class="inline-flex items-center justify-center h-8 w-8 border border-surface-100 rounded-full hover:text-primary-400 hover:border-primary-400"
            ><Icon icon="mdi:instagram" width="24" height="24" />
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-tertiary-700 py-4 text-surface-100">
    <div class="container mx-auto px-4">
      <div class="-mx-4 flex flex-wrap justify-center">
        <div class="px-4 w-full text-center sm:w-auto sm:text-left">
          Copyright &copy; {year}
          {brand}. All Rights Reserved.
        </div>
      </div>
    </div>
  </div>
</footer>
