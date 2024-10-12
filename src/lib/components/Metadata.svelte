<script lang="ts">
  export let meta: Meta;
  export let pathname;
</script>

<svelte:head
  ><title>{meta.title}</title>
  <!-- Meta Tags -->
  <meta name="title" content={meta.title} />
  <meta name="description" content={meta.description} />
  <meta
    name="keywords"
    content="online tutoring, expert tutors, academic success, online education, virtual online services, web development, top-rated tutors, academic improvement, subject-specific tutoring, reddit"
  />
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
