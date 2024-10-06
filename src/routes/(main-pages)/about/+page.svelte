<script lang="ts">
  import { Lazy, MissionVision } from "$lib/components";
</script>

<MissionVision />

<!--Lazy loading component via dynamic import-->
<Lazy this={() => import("$lib/components/InhouseTutor.svelte")}>
  <div slot="loading">loading component...</div>
  <svelte:fragment slot="component" let:Component>
    <Component />
  </svelte:fragment>
</Lazy>
