import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  try {
    const connectionString = process.env.DATABASE_URL;
    if (connectionString && connectionString.startsWith("postgres")) {
      const pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000
      });
      const adapter = new PrismaPg(pool);
      return new PrismaClient({ adapter });
    }
  } catch (error) {
    console.warn("Prisma pg driver adapter initialization warning, using standard PrismaClient:", error);
  }

  return new PrismaClient();
}

export const db = getPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
