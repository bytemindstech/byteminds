<script lang="ts">
  import { Login } from "$lib/components";
  import type { ActionData, PageData } from "./$types";
  export let form: ActionData;
  export let data: PageData;
</script>

<Login {form} {data} />
