import type { Actions, PageServerLoad } from "./$types";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import * as ZodValidationSchema from "$lib/server/validations/zodSchemas";
import * as ContactUsService from "$lib/server/services/contact-us.service";
import { generateId } from "lucia";

export const load = (async () => {
  const contactUsForm = await superValidate(
    zod(ZodValidationSchema.contactUsSchema),
  );

  const contactUsDetails = {
    email: "info@bytemindsph.com",
    phoneNo: "+63 919 125 3021",
    article:
      "At Byteminds, your feedback is highly valued.  Whether you need clarification or want to share an idea, we're here to listen. We encourage you to reach out if you have any questions - our team is always happy to help!",
  };

  return { contactUsForm, contactUsDetails };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request }) => {
    const contactUsForm = await superValidate(
      request,
      zod(ZodValidationSchema.contactUsSchema),
    );

    if (!contactUsForm.valid) {
      return message(contactUsForm, "invalid form", { status: 406 });
    }

    await ContactUsService.createContact({
      id: generateId(15),
      firstName: contactUsForm.data.firstName,
      lastName: contactUsForm.data.lastName,
      email: contactUsForm.data.email,
      message: contactUsForm.data.message,
      isSendNewsLetter: contactUsForm.data.isSendNewsLetter,
    });

    return message(contactUsForm, "Submitted Successfully");
  },
};
