<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";

  export let name: string;
  export let profileImg;
  export let email;

  const getInitials = (fullName: string) => {
    const nameArr = fullName.split(" ");
    const fInit = nameArr[0].charAt(0).toUpperCase();
    const lInit = nameArr[1].charAt(0).toUpperCase();
    return `${fInit}${lInit}`;
  };

  const initials = getInitials(name);
</script>

<div class="bg-surface-100 shadow rounded-lg p-6">
  <div class="flex flex-col items-center">
    <Avatar
      src={profileImg}
      width="w-32"
      background="bg-tertiary-500"
      {initials}
    />
    <h4 class="h4 capitalize">{name}</h4>
    <p class="text-surface-700 md:text-sm">{email}</p>
    <div class="mt-6 flex flex-wrap gap-4 justify-center">
      <button class="btn btn-sm md:btn-md variant-filled-tertiary"
        >Update Profile</button
      >
    </div>
  </div>
</div>
