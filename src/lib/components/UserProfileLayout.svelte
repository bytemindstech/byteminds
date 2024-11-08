<script>
  /** @type {{profile?: import('svelte').Snippet, bio?: import('svelte').Snippet, courses?: import('svelte').Snippet, tutors?: import('svelte').Snippet}} */
  let {
    profile,
    bio,
    courses,
    tutors
  } = $props();
</script>

<div class="container mx-auto py-8">
  <div class="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">
    <div class="col-span-4 md:col-span-3">
      {@render profile?.()}
    </div>
    <div class="col-span-4 md:col-span-9">
      {@render bio?.()}
      {@render courses?.()}
      {@render tutors?.()}
    </div>
  </div>
</div>
