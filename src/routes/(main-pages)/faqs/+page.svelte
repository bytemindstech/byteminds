<script lang="ts">
  import { Accordion } from "$lib/components/ui";
  import * as Icons from "$lib/components/icons";

  const items = [
    {
      icon: Icons.Certificate,
      summary: "Do you have certificate after the training?",
      content: "Yes! We provide certificate after the training class.",
    },

    {
      icon: Icons.Time,
      summary: "Sample question here",
      content: "Lorem ipsum.....",
    },
    {
      icon: Icons.Laptop,
      summary: "Other question",
      content: "Lorem ipsum.....",
    },
    {
      icon: Icons.People,
      summary: "Another new summary",
      content: "Lorem ipsum.....",
    },
  ];
</script>

<div class="container mx-auto min-h-screen mt-8">
  <div class="flex flex-col items-center justify-center p-6">
    <h2 class="h2 mb-5">Frequently Asked Questions</h2>
    <div class="card lg:w-2/3 p-5 mt-8">
      <Accordion autocollapse let:AccordionItem>
        {#each items as item, i}
          <AccordionItem
            open={i === 0 ? true : false}
            icon={item.icon}
            summary={`<h5 class="h5">${item.summary}</h5>`}
            content={`<p class="text-md">${item.content}</p>`}
          />
        {/each}
      </Accordion>
    </div>
  </div>
</div>
