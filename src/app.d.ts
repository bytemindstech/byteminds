// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
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

  type Results = {
    name: string;
    flag: string;
    code: string;
    dial_code: string;
  };
}

export {};
