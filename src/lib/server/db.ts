import { PrismaClient } from "@prisma/client";

// Initialize the PrismaClient instance if it hasn't been initialized yet
if (!global.__db) {
  global.__db = new PrismaClient();
}

// Export the initialized PrismaClient instance
export const db = global.__db;
