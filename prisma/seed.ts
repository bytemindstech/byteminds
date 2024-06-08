import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";

const prisma = new PrismaClient();

const main = async () => {
  try {
    //Create user with admin role
    await prisma.user.upsert({
      where: { email: "admin@mail.test" },
      update: {},
      create: {
        id: generateId(15),
        email: "admin@mail.test",
        email_verified: true,
        firstName: "Super",
        lastName: "User",
        source_info: "facebook",
        hashed_password: await new Argon2id().hash("secret123"),
        username: "superuser123",
        profile: {
          create: {
            id: generateId(15),
            bio: "I am a super user",
          },
        },
        role: {
          create: {
            id: generateId(15),
            isAdmin: true,
            isParent: false,
            isStudent: false,
            isTutor: false,
          },
        },
      },
    });

    //Create user with parent role
    await prisma.user.upsert({
      where: { email: "parent@mail.net" },
      update: {},
      create: {
        id: generateId(15),
        email: "parent@mail.net",
        email_verified: true,
        firstName: "User",
        lastName: "Parent",
        source_info: "facebook",
        hashed_password: await new Argon2id().hash("secret123"),
        username: "parentuser123",
        profile: {
          create: {
            id: generateId(15),
            bio: "I am a parent",
          },
        },
        role: {
          create: {
            id: generateId(15),
            isAdmin: false,
            isParent: true,
            isStudent: false,
            isTutor: false,
          },
        },
      },
    });

    //Create user with student role
    await prisma.user.upsert({
      where: { email: "student@mail.net" },
      update: {},
      create: {
        id: generateId(15),
        email: "student@mail.net",
        email_verified: true,
        firstName: "User",
        lastName: "Student",
        source_info: "youtube",
        hashed_password: await new Argon2id().hash("secret123"),
        username: "studentuser123",
        profile: {
          create: {
            id: generateId(15),
            bio: "I am a student",
          },
        },
        role: {
          create: {
            id: generateId(15),
            isAdmin: false,
            isParent: false,
            isStudent: true,
            isTutor: false,
          },
        },
      },
    });

    //Create user with tutor role
    await prisma.user.upsert({
      where: { email: "tutor@mail.net" },
      update: {},
      create: {
        id: generateId(15),
        email: "tutor@mail.net",
        email_verified: true,
        firstName: "User",
        lastName: "Tutor",
        source_info: "others",
        hashed_password: await new Argon2id().hash("secret123"),
        username: "tutoruser123",
        profile: {
          create: {
            id: generateId(15),
            bio: "I am a tutor",
          },
        },
        role: {
          create: {
            id: generateId(15),
            isAdmin: false,
            isParent: false,
            isStudent: false,
            isTutor: true,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
