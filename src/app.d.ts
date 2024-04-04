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

  // Declare global variable to hold the PrismaClient instance
  var __db: PrismaClient | undefined;

  type User = {
    id: string;
    username: string;
    email: string;
    createdAt?: Date;
    firstName: string;
    lastName: string;
    hashed_password: string;
    email_verified: boolean;
  };

  type EmailVerificationCode = {
    id: string;
    code: string;
    userId: string;
    email: string;
    expiresAt: Date;
  };
}

export {};
