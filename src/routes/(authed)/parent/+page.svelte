<script lang="ts">
  import { Statistics } from "$lib/components/ui";
  import Icon from "@iconify/svelte";
  import dateFormatter from "@jhenbert/date-formatter";
  import { onMount } from "svelte";
  import { getCourses } from "$lib/util.client";
  import type { PageData } from "./$types";
  import type { Course } from "@prisma/client";

  export let data: PageData;

  const dateOption: Intl.DateTimeFormatOptions = {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Manila",
  };

  $: courses = [] as Course[];
  $: tutorCounts = 0;
  $: courseCounts = 0;
  $: enrolleeCounts = 0;
  $: today = dateFormatter("en-PH", dateOption, new Date());

  onMount(async () => {
    const response = await getCourses();
    const users = await data.users;

    if (users) {
      tutorCounts = users.filter((user) => user.role?.isTutor).length;
    }

    if (response.status === "success") {
      courses = response.data;
    }

    courseCounts = courses.length;
  });
</script>

<div class="container mx-auto p-6">
  <div class="mt-8 mb-6">
    <h2 class="h2">Welcome, {data.firstName}</h2>
    <p>
      Today is: <span class="text-sm italic">{today}</span>
    </p>
  </div>

  <button
    class="btn variant-filled-tertiary font-semibold mb-6 max-w-full"
    disabled>Enroll a Child</button
  >

  <div class="flex flex-col md:flex-row gap-4 flex-wrap">
    <div class="flex-1 min-w-[250px]">
      <Statistics
        title="Freelance Tutors"
        data={tutorCounts}
        cardBg="bg-tertiary-400/40"
      >
        <svelte:fragment slot="icon">
          <Icon icon="mdi:cast-tutorial" width="48" height="48" />
        </svelte:fragment>
      </Statistics>
    </div>

    <div class="flex-1 min-w-[250px]">
      <Statistics
        title="Courses Available"
        data={courseCounts}
        cardBg="bg-success-400/40"
      >
        <svelte:fragment slot="icon">
          <Icon icon="ic:round-book" width="48" height="48" />
        </svelte:fragment>
      </Statistics>
    </div>

    <div class="flex-1 min-w-[250px]">
      <Statistics
        title="Courses Enrolled"
        data={enrolleeCounts}
        cardBg="bg-secondary-400/40"
      >
        <svelte:fragment slot="icon">
          <Icon icon="material-symbols:library-books" width="48" height="48" />
        </svelte:fragment>
      </Statistics>
    </div>
  </div>
</div>
