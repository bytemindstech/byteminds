import { PrismaClient } from "@prisma/client";

declare global {
  var __db: PrismaClient | undefined;
}

/**
 * if the instance of PrismaClient is already initialized, use it
 * if it's not initialized, initialize it and save it to the global object
 */
export const db = global.__db || (global.__db = new PrismaClient());
