<script lang="ts">
  import { InhouseTutorForm, InhouseTutorTable } from "$lib/components";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="container mx-auto p-6">
  <InhouseTutorForm formData={data.inHouseTutorForm} />

  {#await data.inHouseTutors}
    <p class="text-lg font-bold mt-4">Loading inhouse tutors please wait....</p>
  {:then inhouseTutors}
    <InhouseTutorTable tableData={inhouseTutors} />
  {/await}
</div>
