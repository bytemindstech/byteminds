import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";

const prisma = new PrismaClient();

async function main() {
  //Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin.admin.com" },
    update: {},
    create: {
      id: generateId(15),
      email: "admin.admin.com",
      email_verified: true,
      firstName: "Admin",
      lastName: "Admin",
      source_info: "others",
      hashed_password: await new Argon2id().hash("admin1337"),
      username: "admin1337",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
