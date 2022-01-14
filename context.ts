import { PrismaClient, User } from "@prisma/client";

export interface Context {
  prisma: PrismaClient;
  user?: Partial<User>;
}

const db = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export const context: Context = {
  prisma: db,
};
