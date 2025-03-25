import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const user1 = await prisma.user.upsert({
    where: { email: "user1@example.com" },
    update: {},
    create: {
      name: "User One",
      email: "user1@example.com",
      emailVerified: true,
      image: "https://example.com/avatar1.png",
      twoFactorEnabled: false,
      Balance: {
        create: { balance: 1000 },
      },
      onRampTranaction: {
        create: {
          balance: 500,
          token: "token123",
          provider: "ProviderA",
          status: "Pending",
        },
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "user2@example.com" },
    update: {},
    create: {
      name: "User Two",
      email: "user2@example.com",
      emailVerified: false,
      image: "https://example.com/avatar2.png",
      twoFactorEnabled: true,
      Balance: {
        create: { balance: 500 },
      },
     onRampTranaction: {
        create: {
          balance: 300,
          token: "token456",
          provider: "ProviderB",
          status: "Pending",
        },
      },
    },
  });

  console.log("Users created:", user1, user2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
