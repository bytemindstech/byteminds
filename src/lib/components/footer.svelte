<script lang="ts">
  import Icon from "@iconify/svelte";

  export let year: number;
  export let brand: string;
</script>

<ul class="logo-cloud grid-cols-1 lg:!grid-cols-5 gap-1 mb-7">
  <li>
    <a
      href="https://www.facebook.com/byteminds"
      target="_blank"
      rel="noreferrer"
      class="logo-item"
      ><span><Icon icon="uiw:facebook" width="32" height="32" /></span><span
        >Facebook</span
      ></a
    >
  </li>
  <li>
    <a href="/" class="logo-item"
      ><span><Icon icon="ri:instagram-fill" width="32" height="32" /></span
      ><span>Instagram</span></a
    >
  </li>
  <li>
    <a href="/" class="logo-item"
      ><span><Icon icon="ion:social-linkedin" width="32" height="32" /></span
      ><span>LinkedIn</span></a
    >
  </li>
  <li>
    <a href="/" class="logo-item"
      ><span
        ><Icon icon="foundation:social-youtube" width="32" height="32" /></span
      ><span>Youtube</span></a
    >
  </li>
  <li>
    <a href="/" class="logo-item">
      <span
        ><Icon
          icon="fa6-brands:square-x-twitter"
          width="32"
          height="32"
        /></span
      >
      <span>X (formely Twitter)</span>
    </a>
  </li>
</ul>
<h4 class="h4 p-7 text-center">&copy {year} {brand}</h4>
