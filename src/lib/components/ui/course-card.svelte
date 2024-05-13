<script lang="ts">
  export let imgSrc;
  export let title;
  export let description;
  export let href;
</script>

<a class="card card-hover overflow-hidden" {href}
  ><header><img src={imgSrc} alt="course" /></header>
  <div>
    <h5 class="h5">{title}</h5>
    <p class="text-gray-400">{description}</p>
  </div>
  <hr class="opacity-50" />
  <footer></footer></a
>
