<script>
  import { ContactForm } from "$lib/components";

  let email = "byteminds.tech@gmail.ccom";
  let phoneNo = "+63 919 125 3021";
  let openHrs = "10:00 am - 9:00 pm";
  let article =
    "At Byteminds, your feedback is highly valued.  Whether you need clarification or want to share an idea, we're here to listen. We encourage you to reach out if you have any questions - our team is always happy to help!";
</script>

<ContactForm {email} {phoneNo} {openHrs} {article} />
