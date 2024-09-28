<script lang="ts">
  import type { PageData } from "./$types";
  import { ContactForm } from "$lib/components";

  export let data: PageData;

  let email = "byteminds.tech@gmail.com";
  let phoneNo = "+63 919 125 3021";
  let openHrs = "10:00 am - 9:00 pm";
  let article =
    "At Byteminds, your feedback is highly valued.  Whether you need clarification or want to share an idea, we're here to listen. We encourage you to reach out if you have any questions - our team is always happy to help!";
</script>

<ContactForm
  {email}
  {phoneNo}
  {openHrs}
  {article}
  formData={data.contactUsForm}
/>
