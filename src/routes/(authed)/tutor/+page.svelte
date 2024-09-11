<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  let showForm = false;

  const showFormHandler = () => {
    showForm = !showForm;
  };
</script>

<div class="min-h-screen">
  <div class="flex flex-row pt-24 px-10 pb-4">
    <div class="w-full">
      <div class="flex flex-row">
        <div
          class="bg-no-repeat bg-error-200 border border-error-300 rounded-xl w-7/12 mr-2 p-6"
        >
          <p class="text-5xl text-primary-900">
            Welcome <br /><strong>{data.firstName} {data.lastName}</strong>
          </p>
          <span class="inline-block mt-12 py-2"
            ><button class="btn variant-filled-error" on:click={showFormHandler}
              >{showForm ? "Show courses" : "Add course"}</button
            ></span
          >
        </div>

        <div
          class="bg-no-repeat bg-tertiary-200 border border-tertiary-300 rounded-xl w-5/12 ml-2 p-6"
        >
          <p class="text-5xl text-primary-900">
            Students Booked <br /><strong>23</strong>
          </p>
        </div>
      </div>

      <div class="flex flex-row h-64 mt-6">
        {#if showForm}
          <div class="bg-surface-100 rounded-xl shadow-lg px-6 py-4 w-full">
            form for add course
          </div>
        {:else}
          <div class="bg-surface-100 rounded-xl shadow-lg px-6 py-4 w-full">
            courses cards
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
