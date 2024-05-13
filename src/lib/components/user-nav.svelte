<script lang="ts">
  import { page } from "$app/stores";
  import { route } from "$lib/ROUTES";
  import { TabAnchor, TabGroup } from "@skeletonlabs/skeleton";

  $: show =
    $page.url.pathname === route("/students")
      ? ""
      : "hidden md:block" && $page.url.pathname === route("/parents")
        ? ""
        : "hidden md:block" && $page.url.pathname === route("/tutors")
          ? ""
          : "hidden md:block" && $page.url.pathname === route("/admin")
            ? ""
            : "hidden md:block" &&
                $page.url.pathname === route("/email-verification")
              ? ""
              : "hidden md:block";
</script>

<TabGroup
  justify="justify-start"
  active="decoration-primary decoration-4 underline underline-offset-4"
  hover="hover:variant-soft-primary"
  flex="flex-1 lg:flex-none"
  rounded="rounded-full"
  border=""
  spacing=""
  class="bg-surface-100-800-token w-full {show}"
>
  <TabAnchor href="https://classroom.jhenbert.com" target="_blank">
    <svelte:fragment slot="lead">Virtual Classroom</svelte:fragment>
  </TabAnchor>
</TabGroup>
