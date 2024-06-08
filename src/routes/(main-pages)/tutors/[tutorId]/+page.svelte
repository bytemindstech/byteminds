<script lang="ts">
  import { page } from "$app/stores";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { tutors } from "$lib/mock.data";
  import { UserBio } from "$lib/components";
  const tutorId = $page.params.tutorId;

  const getTutor = (id: any) => {
    console.log(id);
    return tutors.find((tutor) => tutor.id === Number(id));
  };

  const tutor = getTutor(tutorId);
</script>

<div class="container mx-auto py-8">
  <div class="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">
    <div class="col-span-4 md:col-span-3">
      <div class="bg-surface-100 shadow rounded-lg p-6">
        <div class="flex flex-col items-center">
          <Avatar
            src={tutor?.avatarImgSrc}
            width="w-32"
            background="bg-tertiary-500"
          />
          <h4 class="h4">{tutor?.name}</h4>
          <p class="text-surface-700 md:text-sm">
            Rate: Php{tutor?.rate.toFixed(2)}/hr
          </p>
        </div>
        <hr class="my-6 border-t-2 border-surface-300" />
        <div class="flex flex-col">
          <span class="text-surface-700 uppercase font-bold tracking-wider mb-2"
            >Subject Taught</span
          >
          <ul>
            <li class="mb-2">{tutor?.course}</li>
          </ul>
        </div>
        <button class="btn btn-sm variant-filled-success font-semibold my-4"
          >Book Now</button
        >
        <button class="btn btn-sm variant-filled-success font-semibold my-4"
          >Message Me</button
        >
      </div>
    </div>
    <div class="col-span-4 md:col-span-9">
      <div class="bg-surface-100 shadow rounded-lg p-6"><UserBio /></div>
    </div>
  </div>
</div>
