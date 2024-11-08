<script lang="ts">
  import { InhouseTutorForm, InhouseTutorTable } from "$lib/components";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<div class="container mx-auto p-6">
  <InhouseTutorForm formData={data.inHouseTutorForm} />

  {#await data.inHouseTutors}
    <p class="mt-4 text-lg font-bold">Loading inhouse tutors please wait....</p>
  {:then inhouseTutors}
    <InhouseTutorTable tableData={inhouseTutors} />
  {/await}
</div>
