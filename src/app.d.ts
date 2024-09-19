// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";

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

  interface ModalComponent {
    /** Import and provide your component reference. */
    ref: any;
    /** Provide component props as key/value pairs. */
    props?: Record<string, unknown>;
    /** Provide an HTML template literal for the default slot. */
    slot?: string;
  }

  interface ModalSettings {
    type: "alert" | "confirm" | "prompt" | "component";
    component: ModalComponent | string;
  }
}

export {};
