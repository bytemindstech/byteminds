<script lang="ts">
  import { Lazy, Hero } from "$lib/components";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<Hero />

<!--Lazy loading component via dynamic import-->
<Lazy this={() => import("$lib/components/CallToAction.svelte")} threshold={100}
  ><div slot="fallback">loading component...</div>

  <svelte:fragment slot="component" let:Component
    ><Component />
  </svelte:fragment>
</Lazy>

<Lazy
  this={() => import("$lib/components/CommunityFeedback.svelte")}
  threshold={100}
  ><div slot="fallback">loading component...</div>

  <svelte:fragment slot="component" let:Component
    ><Component data={data.communityFeedback} />
  </svelte:fragment>
</Lazy>
