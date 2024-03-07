<script lang="ts">
  import {
    ListBox,
    ListBoxItem,
    popup,
    type PopupSettings,
  } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";

  let results: Results[] = [];

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/devhammed/78cfbee0c36dfdaa4fce7e79c0d39208/raw/07df5ed443941c504c65e81c83e6313473409d4c/countries.json",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      results = await response.json();
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  onMount(() => {
    fetchData();
  });

  let comboboxValue: string;

  const popupCombobox: PopupSettings = {
    event: "click",
    target: "popupCombobox",
    placement: "bottom",
    closeQuery: ".listbox-item",
  };
</script>

<div>
  <button
    class="btn variant-filled-primary w-16 justify-between"
    use:popup={popupCombobox}
  >
    <span class="uppercase">{comboboxValue ?? "Select"}</span>
    <span>↓</span>
  </button>

  <div class="card w-16 shadow-xl py-2" data-popup="popupCombobox">
    <ListBox rounded="rounded-none">
      {#each results as result}
        <ListBoxItem
          bind:group={comboboxValue}
          name="medium"
          value={result.flag}
        >
          <img
            src="https://flagcdn.com/20x15/{result.code.toLowerCase()}.png"
            alt=""
          />
        </ListBoxItem>
      {/each}
    </ListBox>
    <div class="arrow bg-surface-100-800-token" />
  </div>
</div>
