<script lang="ts">
  import type { PageData } from "./$types";
  import { ContactForm } from "$lib/components";

  export let data: PageData;

  const { email, phoneNo, article } = data.contactUsDetails;
</script>

<ContactForm {email} {phoneNo} {article} formData={data.contactUsForm} />
