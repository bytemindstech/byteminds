<script lang="ts">
  import { Statistics } from "$lib/components/ui";
  import { onMount } from "svelte";
  import { getCourses } from "$lib/util.client";

  import Icon from "@iconify/svelte";
  import dateFormatter from "@jhenbert/date-formatter";

  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  const dateOption: Intl.DateTimeFormatOptions = {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Manila",
  };

  let courses: Course[] = [];
  let courseCounts = $state(0);
  let tutorCounts = $state(0);
  let enrolleeCounts = 0;

  let today = $derived(dateFormatter("en-PH", dateOption, new Date()));

  onMount(async () => {
    const response = await getCourses();

    if (response.status === "success") {
      courses = response.data;
    }
    courseCounts = courses.length;

    const users = await data.users;

    if (users) {
      users.forEach((user) => {
        if (user.role === "TUTOR") tutorCounts++;
      });
    }
  });
</script>

<div class="container mx-auto p-6">
  <div class="mb-6 mt-8">
    <h2 class="h2">Welcome, {data.firstName}</h2>
    <p>
      Today is: <span class="text-sm italic">{today}</span>
    </p>
  </div>

  <div class="flex flex-col gap-4 md:flex-row">
    <div class="min-w-[250px] flex-1">
      <Statistics
        title="Freelance Tutors"
        data={tutorCounts}
        cardBg="bg-tertiary-400/40"
      >
        {#snippet icon()}
          <Icon icon="mdi:cast-tutorial" width="48" height="48" />
        {/snippet}
      </Statistics>
    </div>

    <div class="min-w-[250px] flex-1">
      <Statistics
        title="Courses Available"
        data={courseCounts}
        cardBg="bg-success-400/40"
      >
        {#snippet icon()}
          <Icon icon="ic:round-book" width="48" height="48" />
        {/snippet}
      </Statistics>
    </div>

    <div class="min-w-[250px] flex-1">
      <Statistics
        title="Courses Enrolled"
        data={enrolleeCounts}
        cardBg="bg-secondary-400/40"
      >
        {#snippet icon()}
          <Icon icon="material-symbols:library-books" width="48" height="48" />
        {/snippet}
      </Statistics>
    </div>
  </div>
</div>
