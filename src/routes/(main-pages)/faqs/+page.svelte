<script lang="ts">
  import { Accordion } from "$lib/components/ui";
  import * as Icons from "$lib/components/icons";

  const items = [
    {
      icon: Icons.Early,
      summary: "What is Early Access?",
      content:
        "Early Access allows only freelance tutors to register in our platform and reserve a slot.",
    },

    {
      icon: Icons.People,
      summary: "Can users register on the platform to access tutorials?",
      content:
        "Yes, you can register, but during Early Access, no tutorials are available yet. Registration is only to reserve a slot.",
    },
  ];
</script>

<div class="container mx-auto mt-8 min-h-screen">
  <div class="flex flex-col items-center justify-center p-6">
    <h2 class="h2 mb-5">Frequently Asked Questions</h2>
    <div class="card mt-8 p-5 lg:w-2/3">
      <Accordion autocollapse>
        {#snippet children({ AccordionItem })}
          {#each items as item, index}
            <AccordionItem
              open={index === 0 ? true : false}
              icon={item.icon}
              summary={`<h5 class="h5">${item.summary}</h5>`}
              content={`<p class="text-md">${item.content}</p>`}
            />
          {/each}
        {/snippet}
      </Accordion>
    </div>
  </div>
</div>
