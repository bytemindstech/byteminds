import { Lucia, TimeSpan, type Adapter } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import db from "./db";
import type { Profile, Role } from "@prisma/client";

const adapter: Adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      //set to `true` when using HTTPS
      // secure: !dev,

      //test prod deploy in non https server
      secure: false,
    },
  },
  sessionExpiresIn: new TimeSpan(2, "w"),
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      email_verified: attributes.email_verified,
      email: attributes.email,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email_verified: boolean;
  email: string;
}
