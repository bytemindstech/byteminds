<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import { UserBioPublic } from "$lib/components";
  import { route } from "$lib/ROUTES";
  import type { PageData } from "./$types";
  import { onDestroy } from "svelte";
  import { resetTitle } from "$lib/util.client";

  export let data: PageData;

  type Course = {
    id: string;
    title: string;
  };

  $: courses = data.tutor?.courses as Course[];

  onDestroy(resetTitle);
</script>

<svelte:head><title>{data.title}</title></svelte:head>

<div class="container mx-auto py-8">
  <div class="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">
    <!-- Tutor Profile Section -->
    <div class="col-span-4 md:col-span-3">
      <div class="bg-surface-100 shadow rounded-lg p-6">
        <div class="flex flex-col items-center">
          <Avatar
            src={data.tutor?.profile?.image}
            width="w-32"
            background="bg-tertiary-500"
          />
          <h4 class="h4">
            {data.tutor?.firstName}
            {data.tutor?.lastName.charAt(0)}.
          </h4>
        </div>

        <hr class="my-6 border-surface-300" />

        <div class="flex flex-col">
          <span class="text-surface-700 uppercase font-bold tracking-wider mb-2"
            >Subject Taught</span
          >
          <ul class="grid grid-cols-3 gap-1">
            {#if courses && courses.length > 0}
              {#each courses as course}
                <li>
                  <a
                    class="block text-center capitalize text-xs badge variant-filled-primary transform transition-transform hover:scale-105 overflow-hidden text-ellipsis whitespace-nowrap"
                    href={route("/courses/[courseId]", { courseId: course.id })}
                  >
                    {course.title || "untitled course"}
                  </a>
                </li>
              {/each}
            {:else}
              <li>
                <span class="badge variant-filled-primary"
                  >No course available</span
                >
              </li>
            {/if}
          </ul>
        </div>

        <hr class="mt-4 border-surface-300" />

        <!-- Buttons Section -->
        <div class="md:flex gap-2 justify-center">
          <button
            class="btn btn-sm variant-filled-success font-semibold my-4"
            disabled>Book Now</button
          >
          <button
            class="btn btn-sm variant-filled-success font-semibold my-4"
            disabled>Message Me</button
          >
        </div>
      </div>
    </div>

    <!-- Bio Section -->
    <div class="col-span-4 md:col-span-9">
      <div class="bg-surface-100 shadow rounded-lg p-6">
        <UserBioPublic bio={data.tutor?.profile?.bio} />
      </div>
    </div>
  </div>
</div>
