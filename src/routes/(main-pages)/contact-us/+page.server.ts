import type { Actions, PageServerLoad } from "./$types";
import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import * as ContactUsService from "$lib/server/contact-us.service";
import { generateId } from "lucia";

export const load = (async () => {
  const contactUsForm = await superValidate(
    zod(ZodValidationSchema.contactUsSchema),
  );

  return { contactUsForm };
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
