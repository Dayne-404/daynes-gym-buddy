import { PrismaClient } from "../generated/prisma";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const updatedUser = await prisma.user.update({
    where: { id: 1 },
    data: {
      passwordHash: await argon2.hash("password")
    }
  });

  console.log("Updated user: ", updatedUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
