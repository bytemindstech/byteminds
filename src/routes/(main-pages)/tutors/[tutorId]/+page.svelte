<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import { UserBioPublic } from "$lib/components";
  import { route } from "$lib/ROUTES";
  import { onDestroy, onMount } from "svelte";
  import { getImage, getInitials, resetTitle } from "$lib/util.client";
  import { page } from "$app/stores";

  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let title = $state("");
  let tutor = $state() as Tutor;
  let courses = $state() as Course[];
  let src = $state("");
  let name = $state("");
  let initials = $state("");

  onMount(async () => {
    const users = await data.users;

    const selectedUser = users.find((user) => user.id === $page.params.tutorId);

    if (selectedUser) {
      tutor = selectedUser as Tutor;

      name = `${tutor.firstName} ${tutor.lastName}`;

      title = "ByteMinds PH Tutor | " + name;

      courses = selectedUser.courses.filter(
        (course) => course.userId === $page.params.tutorId,
      ) as Course[];

      const { url } = (await getImage(
        tutor.profile?.image?.key as string,
      )) as ImageResponse;

      src = url;
    }

    initials = getInitials(name);
  });

  onDestroy(() => resetTitle(data.meta.title));
</script>

<svelte:head><title>{title}</title></svelte:head>

<div class="container mx-auto py-8">
  <div class="grid grid-cols-4 gap-6 px-4 md:grid-cols-12">
    <!-- Tutor Profile Section -->
    <div class="col-span-4 md:col-span-3">
      <div class="rounded-lg bg-surface-100 p-6 shadow">
        <div class="flex flex-col items-center">
          <Avatar {src} {initials} width="w-32" background="bg-tertiary-500" />
          <h4 class="h4">
            {tutor?.firstName}
            {tutor?.lastName.charAt(0).toUpperCase()}.
          </h4>
        </div>

        <hr class="my-6 border-surface-300" />

        <div class="flex flex-col">
          <span class="mb-2 font-bold uppercase tracking-wider text-surface-700"
            >Subject Taught</span
          >
          <ul class="grid grid-cols-3 gap-1">
            {#if courses && courses.length > 0}
              {#each courses as course}
                <li>
                  <a
                    class="variant-filled-primary badge block transform overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs capitalize transition-transform hover:scale-105"
                    href={route("/courses/[courseId]", { courseId: course.id })}
                  >
                    {course.title}
                  </a>
                </li>
              {/each}
            {:else}
              <li>
                <span class="variant-filled-primary badge"
                  >No course available</span
                >
              </li>
            {/if}
          </ul>
        </div>

        <hr class="mt-4 border-surface-300" />

        <!-- Buttons Section -->
        <div class="justify-center gap-2 md:flex">
          <button
            class="variant-filled-success btn btn-sm my-4 font-semibold"
            disabled>Book Now</button
          >
          <button
            class="variant-filled-success btn btn-sm my-4 font-semibold"
            disabled>Message Me</button
          >
        </div>
      </div>
    </div>

    <!-- Bio Section -->
    <div class="col-span-4 md:col-span-9">
      <div class="rounded-lg bg-surface-100 p-6 shadow">
        <UserBioPublic biography={tutor?.profile?.bio ?? ""} />
      </div>
    </div>
  </div>
</div>
