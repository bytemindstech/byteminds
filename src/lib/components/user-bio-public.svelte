<script lang="ts">
  import { ProfileData } from "./ui";

  export let bio;
</script>

<h2 class="text-xl font-bold mb-4">About Me</h2>

<p class="text-surface-700">
  {bio ??
    "No data available, please wait for the user to update his/her profile."}
</p>

<ProfileData title="Location"
  ><svelte:fragment slot="subTitle">Complete Address</svelte:fragment>
  <svelte:fragment slot="data">Brgy. Duhat, Tamis City, QC</svelte:fragment>
</ProfileData>

<ProfileData title="Educational Background"
  ><svelte:fragment slot="subTitle">
    <span>Elementary</span><br />
    <span>High School</span><br />
    <span>Vocational</span>
  </svelte:fragment>

  <svelte:fragment slot="data">
    <span>Duhat Elementary School</span><br />
    <span>Duhat High School</span><br />
    <span>Duhat Trade School</span>
  </svelte:fragment>
</ProfileData>
