<script lang="ts">
  import { ReviewCard } from "./ui";

  //import mock data
  import { reviews } from "$lib/mock.data";
</script>

<div class="pt-8 mb-8">
  <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
    <div class="mb-10 space-y-4 px-6 md:px-0">
      <h2 class="h2 text-center font-bold md:text-4xl">
        What the Community Says
      </h2>
    </div>

    <div class="md:columns-2 lg:columns-3 gap-8 space-y-8">
      {#each reviews as review}
        <ReviewCard
          avatarImg={review.avatarImg}
          user={review.user}
          profession={review.profession}
          comment={review.comment}
        />
      {/each}
    </div>
  </div>
</div>
