// // lib/prisma.ts
// import { PrismaClient } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

declare global {
  // eslint-disable-next-line no-var
  var cachePrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachePrisma) {
    global.cachePrisma = new PrismaClient();
  }
  prisma = global.cachePrisma;
}

export const db = prisma;
