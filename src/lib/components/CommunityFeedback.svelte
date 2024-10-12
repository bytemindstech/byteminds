<script lang="ts">
  import { ReviewCard } from "./ui";

  export let data: Promise<
    Array<{
      id: string;
      name: string;
      image: string;
      location: string;
      occupation: string;
      comment: string;
    }>
  >;
</script>

<div class="pt-8 mb-8">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <div class="mb-14 text-center">
      <h2 class="h2 font-bold">What the Community Says</h2>
    </div>

    {#await data}
      <p>loading comments ...</p>
    {:then reviews}
      {#if reviews && reviews.length > 0}
        <div class="space-y-12">
          {#each reviews as review (review.id)}
            <ReviewCard
              avatarImg={review.image}
              user={review.name}
              profession={review.occupation}
              comment={review.comment}
              location={review.location}
            />
          {/each}
        </div>
      {:else}
        <p class="text-lg semi-bold">
          You're the first to have feedback! Help us improve with your thoughts.
        </p>
      {/if}
    {/await}
  </div>
</div>
