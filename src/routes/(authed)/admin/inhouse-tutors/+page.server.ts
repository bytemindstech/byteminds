import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { generateId } from "lucia";
import type { Actions, PageServerLoad } from "./$types";
import * as ZodValidationSchema from "$lib/validations/zodSchemas";
import * as InHouseTutorService from "$lib/server/services/inhouse-tutor.service";

export const load = (async () => {
  return {
    inHouseTutorForm: await superValidate(
      zod(ZodValidationSchema.inHouseTutorSchema),
    ),
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  create: async ({ request }) => {
    const inHouseTutorForm = await superValidate(
      request,
      zod(ZodValidationSchema.inHouseTutorSchema),
    );

    if (!inHouseTutorForm.valid) {
      return message(inHouseTutorForm, "Invalid form", { status: 406 });
    }

    await InHouseTutorService.createInhouseTutor({
      id: generateId(15),
      name: inHouseTutorForm.data.name,
      bio: inHouseTutorForm.data.bio,
      subjectTaught: inHouseTutorForm.data.subjectTaught,
      image: inHouseTutorForm.data.image,
    });

    return message(
      inHouseTutorForm,
      `Successfully added ${inHouseTutorForm.data.name} as an inhouse tutor`,
    );
  },

  update: async ({ request }) => {
    const inHouseTutorForm = await superValidate(
      request,
      zod(ZodValidationSchema.inHouseTutorSchema),
    );

    if (!inHouseTutorForm.valid) {
      return message(inHouseTutorForm, "Invalid form", { status: 406 });
    }

    await InHouseTutorService.updateInhouseTutor({
      id: "",
      name: inHouseTutorForm.data.name,
      bio: inHouseTutorForm.data.bio,
      subjectTaught: inHouseTutorForm.data.subjectTaught,
      image: inHouseTutorForm.data.image,
    });

    return message(
      inHouseTutorForm,
      `Successfully updated tutor ${inHouseTutorForm.data.name}'s profile`,
    );
  },
};
