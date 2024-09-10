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
        username: "superuser123",
        email: "admin@mail.test",

        firstName: "Super",
        lastName: "User",
        sourceInfo: "facebook",
        hashedPassword: {
          create: {
            passwordId: generateId(15),
            hashedPassword: await new Argon2id().hash("secret123"),
          },
        },
        emailVerified: {
          create: {
            emailVerifiedId: generateId(15),
            isEmailVerified: true,
          },
        },
        profile: {
          create: {
            profileId: generateId(15),
            bio: "I am a super user",
          },
        },
        role: {
          create: {
            roleId: generateId(15),
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
        username: "parentuser123",
        email: "parent@mail.net",
        firstName: "User",
        lastName: "Parent",
        sourceInfo: "facebook",
        hashedPassword: {
          create: {
            passwordId: generateId(15),
            hashedPassword: await new Argon2id().hash("secret123"),
          },
        },
        emailVerified: {
          create: {
            emailVerifiedId: generateId(15),
            isEmailVerified: true,
          },
        },
        profile: {
          create: {
            profileId: generateId(15),
            bio: "I am a parent",
          },
        },
        role: {
          create: {
            roleId: generateId(15),
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
        username: "studentuser123",
        firstName: "User",
        lastName: "Student",
        sourceInfo: "youtube",
        hashedPassword: {
          create: {
            passwordId: generateId(15),
            hashedPassword: await new Argon2id().hash("secret123"),
          },
        },
        emailVerified: {
          create: {
            emailVerifiedId: generateId(15),
            isEmailVerified: true,
          },
        },
        profile: {
          create: {
            profileId: generateId(15),
            bio: "I am a student",
          },
        },
        role: {
          create: {
            roleId: generateId(15),
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
        username: "tutoruser123",
        firstName: "User",
        lastName: "Tutor",
        sourceInfo: "others",
        hashedPassword: {
          create: {
            passwordId: generateId(15),
            hashedPassword: await new Argon2id().hash("secret123"),
          },
        },
        emailVerified: {
          create: {
            emailVerifiedId: generateId(15),
            isEmailVerified: true,
          },
        },
        profile: {
          create: {
            profileId: generateId(15),
            bio: "I am a tutor",
          },
        },
        role: {
          create: {
            roleId: generateId(15),
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
