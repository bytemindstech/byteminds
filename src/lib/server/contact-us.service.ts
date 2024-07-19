import db from "./db";
import type { Contact } from "@prisma/client";

export const createContact = async (contact: Contact) => {
  return await db.contact.create({
    data: contact,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      message: true,
      isSendNewsLetter: true,
    },
  });
};
