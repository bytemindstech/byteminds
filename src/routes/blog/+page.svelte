<script>
  import icon from "../../assets/images/blogicon.png";

  export let data;
</script>

<div class="container mx-auto">
  <div class="flex items-center justify-start space-x-5 my-10">
    <img src={icon} alt="" width="60px" />
    <ul>
      {#each data.summaries as { slug, title }}
        <li>
          <a
            href="/blog/{slug}"
            class="hover:underline decoration-primary-700 decoration-2"
            >{title}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</div>
