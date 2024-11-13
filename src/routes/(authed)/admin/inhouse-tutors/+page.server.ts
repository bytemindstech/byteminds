import { superValidate, message } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { generateId } from "lucia";
import type { Actions, PageServerLoad } from "./$types";
import * as ZodValidationSchema from "$lib/server/validations/zodSchemas";
import * as InHouseTutorService from "$lib/server/services/inhouse-tutor.service";
import { ObjectStorage } from "$lib/util.sever";
import { BUCKET_NAME } from "$lib/constants";

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

    // Initialized ObjectStoarge instance
    const objectStorage = new ObjectStorage();

    const imageFile = inHouseTutorForm.data.image as File | null;

    if (!imageFile) {
      return message(inHouseTutorForm, "No image uploaded", { status: 406 });
    }

    const inHouseTutorId = generateId(15);
    const fileName = `${inHouseTutorId}-${imageFile.name}`;
    const arrayBuffer = await imageFile.arrayBuffer();
    const fileContent = new Uint8Array(arrayBuffer);

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
    };

    // Upload image to Object Storage (S3)
    await objectStorage.upload(uploadParams);

    // Send to database
    await InHouseTutorService.createInhouseTutor(
      {
        id: inHouseTutorId,
        name: inHouseTutorForm.data.name,
        bio: inHouseTutorForm.data.bio,
        subjectTaught: inHouseTutorForm.data.subjectTaught,
      },
      { id: generateId(15), key: fileName },
    );

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
      id: "", // pending just now
      name: inHouseTutorForm.data.name,
      bio: inHouseTutorForm.data.bio,
      subjectTaught: inHouseTutorForm.data.subjectTaught,
    });

    return message(
      inHouseTutorForm,
      `Successfully updated tutor ${inHouseTutorForm.data.name}'s profile`,
    );
  },
};
