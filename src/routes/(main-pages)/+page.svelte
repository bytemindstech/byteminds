<script>
  import { Lazy, Hero } from "$lib/components";
</script>

<Hero />

<!--Lazy loading component via dynamic import-->
<Lazy this={() => import("$lib/components/CallToAction.svelte")}
  ><div slot="loading">loading component...</div>

  <svelte:fragment slot="component" let:Component
    ><Component />
  </svelte:fragment>
</Lazy>

<Lazy this={() => import("$lib/components/CommunityFeedback.svelte")}
  ><div slot="loading">loading component...</div>

  <svelte:fragment slot="component" let:Component
    ><Component />
  </svelte:fragment>
</Lazy>
