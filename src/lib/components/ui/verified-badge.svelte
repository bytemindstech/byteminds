<script lang="ts">
  import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";

  const popupHover: PopupSettings = {
    event: "hover",
    target: "popupHover",
    placement: "top",
  };
</script>

<div
  class="badge variant-filled-primary [&>*]:pointer-events-none"
  use:popup={popupHover}
>
  <Icon icon="mage:verified-check-fill" width="16" height="16" /><span
    class="text-xs text-surface-800">Verified</span
  >
</div>

<div
  class="card p-2 w-64 variant-filled-secondary z-10"
  data-popup="popupHover"
>
  <p class="text-xs">
    This tutor has undergone verification according to ByteMinds PH standard
    procedures, ensuring compliance with data privacy regulations.
  </p>
  <div class="arrow variant-filled-secondary" />
</div>
