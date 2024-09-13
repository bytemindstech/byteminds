<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import { UserBioPublic } from "$lib/components";
  import { route } from "$lib/ROUTES";
  import type { PageData } from "./$types";

  export let data: PageData;

  type Course = {
    id: string;
    title: string;
  };

  const courses = data.tutor?.courses as Course[];
</script>

<div class="container mx-auto py-8">
  <div class="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">
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
        <hr class="my-6 border-t-2 border-surface-300" />
        <div class="flex flex-col">
          <span class="text-surface-700 uppercase font-bold tracking-wider mb-2"
            >Subject Taught</span
          >
          <ul class="flex items-center gap-1">
            {#if courses && courses.length > 0}
              {#each courses as course}
                <a
                  class="anchor transform transition-transform hover:scale-105"
                  href={route("/courses/[courseId]", { courseId: course.id })}
                  ><li class="mb-2 capitalize text-sm">
                    <span class="badge variant-filled-primary"
                      >{course.title || "untitled course"}</span
                    >
                  </li></a
                >
              {/each}
            {:else}
              <span class="badge variant-filled-primary"
                >No course available</span
              >
            {/if}
          </ul>
        </div>
        <!-- <button class="btn btn-sm variant-filled-success font-semibold my-4"
          >Book Now</button
        >
        <button class="btn btn-sm variant-filled-success font-semibold my-4"
          >Message Me</button
        > -->
      </div>
    </div>

    <div class="col-span-4 md:col-span-9">
      <div class="bg-surface-100 shadow rounded-lg p-6">
        <UserBioPublic bio={data.tutor?.profile?.bio} />
      </div>
    </div>
  </div>
</div>
