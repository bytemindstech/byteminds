// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: string | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  // Declare global variable to hold the PrismaClient instance
  var __db: PrismaClient | undefined;

  type User = {
    id: string;
    username: string;
    email: string;
    createdAt?: Date;
    firstName: string;
    lastName: string;
    password: string;
  };

  type LoginSuccess = {
    success?: boolean;
  };

  type LoginFailure = ActionFailure<{
    username: FormDataEntryValue | null;
    missing: boolean;
    notFound: boolean;
    incorrect: boolean;
  }>;

  type LoginResult = LoginSuccess | LoginFailure;
}

export {};
