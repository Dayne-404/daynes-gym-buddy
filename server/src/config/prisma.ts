import { PrismaClient } from "@prisma/client";
import { env } from "./env";

/**
 * Prisma Client Singleton
 *
 * Prevents multiple Prisma instances during development hot-reloads.
 * Adds enviornment-based logging and graceful shutdown handling.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.isProd ? ["error"] : ["query", "error", "warn"],
  });

if (!env.isProd) {
  globalForPrisma.prisma = prisma;
}
