<script lang="ts">
  import type { PageData } from "./$types";
  import { ContactForm } from "$lib/components";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  const { email, phoneNo, article } = data.contactUsDetails;
</script>

<ContactForm {email} {phoneNo} {article} formData={data.contactUsForm} />
