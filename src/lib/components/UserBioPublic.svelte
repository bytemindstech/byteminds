<script lang="ts">
  // import { ProfileData } from "./ui";
  interface Props {
    biography: string;
  }

  let { biography }: Props = $props();
</script>

<h2 class="h2 mb-4">About Me</h2>

<p class="text-surface-700">
  {biography ??
    "No data available, please wait for the user to update his/her profile."}
</p>

<!-- <ProfileData title="Location"
  >{#snippet subTitle()}
    Complete Address
  {/snippet}
  {#snippet data()}
    Brgy. Duhat, Tamis City, QC
  {/snippet}
</ProfileData>

<ProfileData title="Educational Background"
  >{#snippet subTitle()}
  
      <span>Elementary</span><br />
      <span>High School</span><br />
      <span>Vocational</span>
    
  {/snippet}

  {#snippet data()}
  
      <span>Duhat Elementary School</span><br />
      <span>Duhat High School</span><br />
      <span>Duhat Trade School</span>
    
  {/snippet}
</ProfileData> -->
