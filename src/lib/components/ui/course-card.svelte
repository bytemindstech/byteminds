<script lang="ts">
  import { route } from "$lib/ROUTES";

  export let id: number;
  export let imgSrc: string;
  export let title: string;
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
  <div class="p-4">
    <h5 class="h5">{title}</h5>
  </div>
  <hr class="opacity-50" />
</a>
