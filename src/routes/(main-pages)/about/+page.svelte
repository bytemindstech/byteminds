<script lang="ts">
  import { MissionVision, Lazy } from "$lib/components";
  import type { LayoutData } from "../$types";

  export let data: LayoutData;
</script>

<MissionVision />

<Lazy this={() => import("$lib/components/InhouseTutor.svelte")} threshold={100}
  ><div slot="fallback">loading component...</div>

  <svelte:fragment slot="component" let:Component
    ><Component inhouseTutors={data.inHouseTutors} />
  </svelte:fragment>
</Lazy>
