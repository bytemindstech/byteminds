<script lang="ts">
  import { route } from "$lib/ROUTES";
  import Icon from "@iconify/svelte";
  import { Avatar } from "@skeletonlabs/skeleton";

  export let year: number;
  export let brand: string;
</script>

<footer>
  <div class="bg-surface-800 py-4 text-surface-300">
    <div class="container px-4 mx-auto">
      <div class="-mx-4 flex flex-wrap justify-between">
        <div class="px-4 my-4 w-full xl:w-1/5">
          <a href="/" class="flex flex-wrap items-center gap-4 w-56 mb-8">
            <Avatar
              src={route("githubAvatar", { avatarId: 159615949 })}
              width="w-14"
            />
            <h3 class="h3">{brand}</h3>
          </a>
          <p class="whitespace-normal">
            ByteMinds PH Inc., A Company Registered in the Philippines
          </p>
        </div>

        <div class="px-4 my-4 w-full sm:w-auto">
          <div>
            <h3 class="h3 inline-block pb-4 mb-4 border-b-4 border-primary-600">
              Company
            </h3>
          </div>
          <ul class="leading-8">
            <li>
              <a href={route("/about")} class="hover:text-primary-400"
                >About Us</a
              >
            </li>
            <li>
              <a href={route("/tos")} class="hover:text-primary-400"
                >Terms &amp; Conditions</a
              >
            </li>
            <li>
              <a href={route("/privacy-policy")} class="hover:text-primary-400"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a href={route("/contact-us")} class="hover:text-primary-400"
                >Contact Us</a
              >
            </li>
          </ul>
        </div>
        <div class="px-4 my-4 w-full sm:w-auto">
          <div>
            <h3 class="h3 inline-block pb-4 mb-4 border-b-4 border-primary-600">
              Tutorial Services
            </h3>
          </div>
          <ul class="leading-8">
            <li>English</li>
            <li>Math</li>
            <li>Reading</li>
            <li>Science</li>
            <li>Advance Math</li>
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
            <Icon icon="ic:outline-facebook" width="24" height="24" />
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
          <!-- github -->
          <a
            href={route("github")}
            class="inline-flex items-center justify-center h-8 w-8 border border-surface-100 rounded-full hover:text-primary-400 hover:border-primary-400"
            ><Icon icon="mdi:github" width="24" height="24" />
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-tertiary-700 py-4 text-surface-100">
    <div class="container mx-auto px-4">
      <div class="-mx-4 flex flex-wrap justify-center">
        <div class="px-4 w-full text-center sm:w-auto sm:text-left">
          Copyright &copy; {year} ByteMinds PH. All Rights Reserved.
        </div>
      </div>
    </div>
  </div>
</footer>
