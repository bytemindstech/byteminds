<script lang="ts">
  import { Statistics } from "$lib/components/ui";
  import Icon from "@iconify/svelte";
  import dateFormatter from "@jhenbert/date-formatter";
  import type { PageData } from "./$types";

  export let data: PageData;

  const dateOption: Intl.DateTimeFormatOptions = {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Manila",
  };

  $: today = dateFormatter("en-PH", dateOption, new Date());
</script>

<div class="container mx-auto px-6">
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
        data={data.tutorCounts}
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
        data={data.courses?.length}
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
        data="0"
        cardBg="bg-secondary-400/40"
      >
        <svelte:fragment slot="icon">
          <Icon icon="material-symbols:library-books" width="48" height="48" />
        </svelte:fragment>
      </Statistics>
    </div>
  </div>
</div>
