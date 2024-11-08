<script lang="ts">
  import { Lazy, Hero } from "$lib/components";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<Hero />

<!--Lazy loading component via dynamic import-->
<Lazy this={() => import("$lib/components/CallToAction.svelte")} threshold={100}
  >{#snippet fallback()}
    <div>loading component...</div>
  {/snippet}

  {#snippet component({ Component })}
    <Component />
  {/snippet}
</Lazy>

<Lazy
  this={() => import("$lib/components/CommunityFeedback.svelte")}
  threshold={100}
  >{#snippet fallback()}
    <div>loading component...</div>
  {/snippet}

  {#snippet component({ Component })}
    <Component data={data.communityFeedback} />
  {/snippet}
</Lazy>
