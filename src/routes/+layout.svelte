<script lang="ts">
  import { Footer, Navigation } from "$lib/components";
  import {
    AppShell,
    Drawer,
    Toast,
    getDrawerStore,
    initializeStores,
    storePopup,
  } from "@skeletonlabs/skeleton";
  import {
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow,
  } from "@floating-ui/dom";
  import image from "$lib/assets/images/logo.webp";

  //global css
  import "../app.pcss";
  import { afterNavigate } from "$app/navigation";
  import type { AfterNavigate } from "@sveltejs/kit";
  import { route } from "$lib/ROUTES";
  import { page } from "$app/stores";

  //SEO Meta tags

  const metaDefaults = {
    title: "ByteMinds PH - Online Tutoring for Academic Excellence",
    description:
      "ByteMinds PH - your trusted partner in online education. Access expert tutoring services anytime, anywhere, and elevate your learning experience.",
    image: `${image}`,
  };

  const meta = {
    title: metaDefaults.title,
    description: metaDefaults.description,
    image: metaDefaults.image,

    //Twitter
    twitter: {
      title: metaDefaults.title,
      description: metaDefaults.description,
      image: metaDefaults.image,
    },
  };

  page.subscribe(() => {
    //Restore Page Defaults
    meta.title = metaDefaults.title;
    meta.description = metaDefaults.description;
    meta.image = metaDefaults.image;
    //Restore Twitter Defaults
    meta.twitter.title = metaDefaults.title;
    meta.twitter.description = metaDefaults.description;
    meta.twitter.image = metaDefaults.image;
  });

  //requirement for popup
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  //scroll to top on navigation
  afterNavigate((params: AfterNavigate) => {
    const isNewPage = params.from?.url.pathname !== params.to?.url.pathname;
    const elemPage = document.querySelector("#page");
    if (isNewPage && elemPage !== null) {
      elemPage.scrollTop = 0;
    }
  });

  initializeStores();

  const drawerStore = getDrawerStore();

  const drawerClose = () => {
    drawerStore.close();
  };

  const paths = [
    { route: route("/"), name: "home" },
    { route: route("/about"), name: "about" },
    { route: route("/faqs"), name: "faqs" },
  ];
</script>

<svelte:head
  ><title>{meta.title}</title>
  <!-- Meta Tags -->
  <meta name="title" content={meta.title} />
  <meta name="description" content={meta.description} />
  <meta
    name="keywords"
    content="online tutoring, expert tutors, academic success, online education, virtual online services, top-rated tutors, academic improvement, subject-specific tutoring, reddit"
  />
  <meta name="author" content="ByteMinds PH" />
  <!-- Open Graph - https://ogp.me/ -->
  <meta property="og:site_name" content="ByteMinds PH" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://byteminds.ph{$page.url.pathname}" />
  <meta property="og:locale" content="en_PH" />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:image" content={meta.image} />
  <meta property="og:image:secure_url" content={meta.image} />
  <meta property="og:image:type" content="image/webp" />
  <meta property="og:image:width" content="338" />
  <meta property="og:image:height" content="338" />
  <meta property="og:image:alt" content="ByteMinds PH logo" />
  <!-- Open Graph: Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@ByteMindsPH" />
  <meta name="twitter:creator" content="@ByteMindsPH" />
  <meta name="twitter:title" content={meta.twitter.title} />
  <meta name="twitter:description" content={meta.twitter.description} />
  <meta name="twitter:image" content={meta.twitter.image} />
</svelte:head>

<!-- Overlays -->
<Toast />
<Drawer
  ><Navigation {paths} />

  <div class="flex justify-center mt-5">
    <a
      href={route("/register")}
      class="btn btn-lg variant-ghost-tertiary hover:variant-filled-primary"
      on:click={drawerClose}>Register Now</a
    >
  </div>
</Drawer>

<AppShell slotPageFooter="bg-secondary">
  <slot />

  <svelte:fragment slot="pageFooter">
    <Footer year={2024} brand="ByteMinds" />
  </svelte:fragment>
</AppShell>
