<script lang="ts">
  import { route } from "$lib/ROUTES";

  export let imgSrc;
  export let title;
  export let description;
  export let id;
</script>

<a
  class="card card-hover overflow-hidden"
  href={route("/courses/[courseId]", { courseId: id })}
  ><header>
    <img
      src={imgSrc}
      alt="course"
      class="w-full aspect-[16/9]"
      width="500"
      height="100"
    />
  </header>
  <div class="card-footer">
    <h5 class="h5">{title}</h5>
    <p class="text-surface-600 text-sm">{description}</p>
  </div>
  <hr class="opacity-50" />
</a>
