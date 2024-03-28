<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    CertIcon,
    TimeIcon,
    LaptopCode,
  } from "$lib/components/ui";
</script>

<div class="container mx-auto mt-5">
  <div class="flex flex-col items-center justify-center p-6">
    <h2 class="h2 mb-5">Frequently Asked Questions</h2>
    <div class="card lg:w-2/3 p-5">
      <Accordion autocollapse
        ><svelte:fragment slot="accordionItem"
          ><AccordionItem
            open={true}
            icon={CertIcon}
            summary="<h5 class='h5'>Do you have certificate after the training?</h5>"
            content="<p class='text-lg'>Yes! We provide certificate after the training class.</p>"
          />

          <AccordionItem
            open={false}
            icon={TimeIcon}
            summary="<h5 class='h5'>Sample question here</h5>"
            content="<p class='text-lg'>Lorem ipsum.....</p>"
          />

          <AccordionItem
            open={false}
            icon={LaptopCode}
            summary="<h5 class='h5'>Other question here</h5>"
            content="<p class='text-lg'>Lorem ipsum.....</p>"
          />
        </svelte:fragment>
      </Accordion>
    </div>
  </div>
</div>
