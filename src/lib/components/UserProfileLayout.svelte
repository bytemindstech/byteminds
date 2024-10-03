<div class="container mx-auto py-8">
  <div class="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">
    <div class="col-span-4 md:col-span-3">
      <slot name="profile" />
    </div>
    <div class="col-span-4 md:col-span-9">
      <slot name="bio" />
      <slot name="courses" />
      <slot name="tutors" />
    </div>
  </div>
</div>
