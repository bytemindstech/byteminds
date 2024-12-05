<script lang="ts">
  import { writable } from "svelte/store";

  interface Props {
    meta: Meta;
    pathname: string;
  }

  let { meta, pathname }: Props = $props();

  let title = writable(meta.title);

  const keywordsContent =
    "online tutoring Philippines, Philppines expert online tutors, virtual coding tutorials Philippines, top-rated web development tutors Philippines, online academic bootcamp Philippines, subject-specific vitual tutoring services, Philippines online academic improvement, web development coaching Philippines, coding bootcamps online Philippines, best online tutors Philippines, virtual academic support Philippines, Southeast Asia online tutoring services";
</script>

<svelte:head>
  <title>{$title}</title>
  <!-- Meta Tags -->
  <meta name="title" content={$title} />
  <meta name="description" content={meta.description} />
  <meta name="keywords" content={keywordsContent} />
  <meta name="author" content="ByteMinds PH" />
  <!-- Open Graph - https://ogp.me/ -->
  <meta property="og:site_name" content="ByteMinds PH" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://bytemindsph.com{pathname}" />
  <meta property="og:locale" content="en_PH" />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:image" content={meta.image} />
  <meta property="og:image:secure_url" content={meta.image} />
  <meta property="og:image:type" content="image/jpg" />
  <meta property="og:image:width" content="460" />
  <meta property="og:image:height" content="460" />
  <meta property="og:image:alt" content="ByteMinds PH logo" />
  <!-- Open Graph: Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@ByteMindsPH" />
  <meta name="twitter:creator" content="@ByteMindsPH" />
  <meta name="twitter:title" content={meta.twitter.title} />
  <meta name="twitter:description" content={meta.twitter.description} />
  <meta name="twitter:image" content={meta.twitter.image} />
</svelte:head>
