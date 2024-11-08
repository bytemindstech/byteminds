<script lang="ts">
  import { triggerToast, type TriggerToast } from "$lib/util.client";
  interface Props {
    message: string;
    type: TriggerToast;
  }

  let { message, type }: Props = $props();

  triggerToast(message, type);
</script>
