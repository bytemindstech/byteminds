<script lang="ts">
  import { triggerToast, type TriggerToast } from "$lib/util.client";
  export let message: string;
  export let type: TriggerToast;

  triggerToast(message, type);
</script>
