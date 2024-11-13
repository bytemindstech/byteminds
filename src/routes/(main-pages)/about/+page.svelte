<script lang="ts">
  import { MissionVision, Lazy } from "$lib/components";

  import type { LayoutData } from "../$types";

  interface Props {
    data: LayoutData;
  }

  let { data }: Props = $props();
</script>

<MissionVision />

<Lazy this={() => import("$lib/components/InhouseTutor.svelte")} threshold={100}
  >{#snippet fallback()}
    <div>loading component...</div>
  {/snippet}

  {#snippet component({ Component })}
    <Component inhouseTutors={data.inHouseTutors} />
  {/snippet}
</Lazy>
