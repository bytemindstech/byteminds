import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";

const prisma = new PrismaClient();

const main = async () => {
  try {
    // Create user with admin role
    // await prisma.user.upsert({
    //   where: { email: "admin@mail.test" },
    //   update: {},
    //   create: {
    //     id: generateId(15),
    //     username: "superuser123",
    //     email: "admin@mail.test",
    //     firstName: "Super",
    //     lastName: "User",
    //     sourceInfo: "facebook",
    //     hashedPassword: {
    //       create: {
    //         passwordId: generateId(15),
    //         hashedPassword: await new Argon2id().hash("secret123"),
    //       },
    //     },
    //     emailVerified: {
    //       create: {
    //         emailVerifiedId: generateId(15),
    //         isEmailVerified: true,
    //       },
    //     },
    //     profile: {
    //       create: {
    //         profileId: generateId(15),
    //         image:
    //           "https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         bio: "I am an admin user",
    //       },
    //     },
    //     role: {
    //       create: {
    //         roleId: generateId(15),
    //         isAdmin: true,
    //         isParent: false,
    //         isStudent: false,
    //         isTutor: false,
    //       },
    //     },
    //   },
    // });
    //Create user with parent role
    // await prisma.user.upsert({
    //   where: { email: "parent@mail.net" },
    //   update: {},
    //   create: {
    //     id: generateId(15),
    //     username: "parentuser123",
    //     email: "parent@mail.net",
    //     firstName: "User",
    //     lastName: "Parent",
    //     sourceInfo: "facebook",
    //     hashedPassword: {
    //       create: {
    //         passwordId: generateId(15),
    //         hashedPassword: await new Argon2id().hash("secret123"),
    //       },
    //     },
    //     emailVerified: {
    //       create: {
    //         emailVerifiedId: generateId(15),
    //         isEmailVerified: true,
    //       },
    //     },
    //     profile: {
    //       create: {
    //         profileId: generateId(15),
    //         image:
    //           "https://images.pexels.com/photos/3454298/pexels-photo-3454298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         bio: "I am a parent",
    //       },
    //     },
    //     role: {
    //       create: {
    //         roleId: generateId(15),
    //         isAdmin: false,
    //         isParent: true,
    //         isStudent: false,
    //         isTutor: false,
    //       },
    //     },
    //   },
    // });
    //Create user with student role
    // await prisma.user.upsert({
    //   where: { email: "student@mail.net" },
    //   update: {},
    //   create: {
    //     id: generateId(15),
    //     email: "student@mail.net",
    //     username: "studentuser123",
    //     firstName: "User",
    //     lastName: "Student",
    //     sourceInfo: "youtube",
    //     hashedPassword: {
    //       create: {
    //         passwordId: generateId(15),
    //         hashedPassword: await new Argon2id().hash("secret123"),
    //       },
    //     },
    //     emailVerified: {
    //       create: {
    //         emailVerifiedId: generateId(15),
    //         isEmailVerified: true,
    //       },
    //     },
    //     profile: {
    //       create: {
    //         profileId: generateId(15),
    //         image:
    //           "https://images.pexels.com/photos/5615665/pexels-photo-5615665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         bio: "I am a student",
    //       },
    //     },
    //     role: {
    //       create: {
    //         roleId: generateId(15),
    //         isAdmin: false,
    //         isParent: false,
    //         isStudent: true,
    //         isTutor: false,
    //       },
    //     },
    //   },
    // });
    //Create user with tutor role
    await prisma.user.upsert({
      where: { email: "tutor2@mail.net" },
      update: {},
      create: {
        id: generateId(15),
        email: "tutor2@mail.net",
        username: "tutoruser2123",
        firstName: "User2",
        lastName: "Tutor2",
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
            image:
              "https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            bio: "I am an experienced reading tutor with over 10 years of dedicated work in the field of literacy education. With a background in Elementary Education and a Master's degree in Literacy Studies, Jane has helped hundreds of students improve their reading comprehension, vocabulary, and fluency. She specializes in working with young learners who struggle with reading, offering personalized, one-on-one sessions tailored to each student's unique learning style.",
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
        courses: {
          create: {
            id: generateId(15),
            title: "reading",
            price: 50.99,
            description:
              "Reading is a magical journey for children, opening the doors to imagination, knowledge, and endless possibilities. Through stories, kids can explore faraway lands, meet fascinating characters, and learn valuable lessons about life and the world around them. Reading not only improves vocabulary and comprehension but also helps develop critical thinking and creativity.",
            image:
              "https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            rating: "5",
          },
        },
      },
    });

    // const id = generateId(15)
    //create course
    // await prisma.course.upsert({
    //   where: { id: id },
    //   update: {},
    //   create: {
    //     id: id,
    //     userId: "u3hxwwh2enxppg7",
    //     title: "math",
    //     price: 60.99,
    //     description:
    //       "Math is all about numbers, shapes, and patterns! It's like solving fun puzzles that help us understand the world around us. From counting and measuring to discovering how things work, math helps us think smart and solve problems. Whether you're building, drawing, or exploring, math is the key to making amazing things happen!",
    //     image:
    //       "https://images.pexels.com/photos/374918/pexels-photo-374918.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     rating: "4.5",
    //   },
    // });
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
