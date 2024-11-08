// See https://kit.svelte.dev/docs/types#app

import type { Image, PrismaClient } from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HTMLAttributes } from "svelte/elements";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      //Lucia
      user: import("lucia").User | null;
      session: import("lucia").Session | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined;

  type Course = {
    id: string;
    title: string;
    price: number;
    image: Image | null;
  };

  type MetaDefault = { title: string; description: string; image: string };

  type Meta = MetaDefault & {
    twitter: MetaDefault;
  };

  type Tutor = {
    id: string;
    profile: { image: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    courses: Array<any>;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
  };
}

declare module "svelte/elements" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    onenterViewport?: (event: CustomEvent<void>) => void;
    onexitViewport?: (event: CustomEvent<void>) => void;
  }
}

export {};
