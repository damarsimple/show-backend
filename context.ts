import { PrismaClient } from "@prisma/client";

export interface Context {
  prisma: PrismaClient;
}

const db = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export const context: Context = {
  prisma: db,
};
