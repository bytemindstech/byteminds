import { PrismaClient } from "@prisma/client";

/**
 * If the instance of PrismaClient is already initialized, use it
 * if it's not initialized, initialize it and save it to the global object
 */
const db = global.__db || (global.__db = new PrismaClient());
if (process.env.NODE_ENV === "development") global.__db = db;

export default db;
