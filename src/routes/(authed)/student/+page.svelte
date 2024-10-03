<script lang="ts">
  import { Statistics } from "$lib/components/ui";
  import Icon from "@iconify/svelte";
  import dateFormatter from "@jhenbert/date-formatter";
  import type { PageData } from "./$types";
  import type { Course } from "@prisma/client";
  import { onMount } from "svelte";
  import { getCourses } from "$lib/util.client";

  export let data: PageData;

  const dateOption: Intl.DateTimeFormatOptions = {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Manila",
  };

  $: today = dateFormatter("en-PH", dateOption, new Date());

  $: courses = [] as Course[];
  $: courseCounts = 0;
  $: tutorCounts = 0;
  $: enrolleeCounts = 0;

  onMount(async () => {
    const response = await getCourses();

    if (response.status === "success") {
      courses = response.data;
    }
    courseCounts = courses.length;

    const users = await data.users;
    if (users) {
      tutorCounts = users.filter((user) => user.role === "TUTOR").length;
    }
  });
</script>

<div class="container mx-auto p-6">
  <div class="mt-8 mb-6">
    <h2 class="h2">Welcome, {data.firstName}</h2>
    <p>
      Today is: <span class="text-sm italic">{today}</span>
    </p>
  </div>

  <div class="flex flex-col md:flex-row gap-4">
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
