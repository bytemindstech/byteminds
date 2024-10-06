// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";
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

  var __db: PrismaClient | undefined;

  type Course = {
    id: string;
    title: string;
    price: number;
    image?: string; // Optional image field
  };

  type MetaDefault = { title: string; description: string; image: string };

  type Meta = MetaDefault & {
    twitter: MetaDefault;
  };
}

declare module "svelte/elements" {
  interface HTMLAttributes<T> {
    "on:enterViewport"?: (event: CustomEvent<void>) => void;
    "on:exitViewport"?: (event: CustomEvent<void>) => void;
  }
}

export {};
