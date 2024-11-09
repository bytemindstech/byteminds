import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";

const prisma = new PrismaClient();

const main = async () => {
  try {
    // Create user with admin role
    await prisma.user.upsert({
      where: { email: "admin@mail.net" },
      update: {},
      create: {
        id: generateId(15),
        username: "admin000",
        email: "admin@mail.net",
        firstName: "Admin",
        lastName: "User",
        sourceInfo: "facebook",
        role: "ADMIN",
        isEmailVerified: true,
        hashedPassword: {
          create: {
            passwordId: generateId(15),
            hashedPassword: await new Argon2id().hash("secret123"),
          },
        },
        profile: {
          create: {
            profileId: generateId(15),
            image:
              "https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            bio: "I am an admin user",
          },
        },
      },
    });

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
    //     role: "PARENT",
    //     isEmailVerified: true,
    //     profile: {
    //       create: {
    //         profileId: generateId(15),
    //         image:
    //           "https://images.pexels.com/photos/3454298/pexels-photo-3454298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         bio: "I am a parent",
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
    //     role: "STUDENT",
    //     isEmailVerified: true,
    //     profile: {
    //       create: {
    //         profileId: generateId(15),
    //         image:
    //           "https://images.pexels.com/photos/5615665/pexels-photo-5615665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         bio: "I am a student",
    //       },
    //     },
    //   },
    // });

    //Create user with tutor role
    await prisma.user.upsert({
      where: { email: "tutor@mail.net" },
      update: {},
      create: {
        id: generateId(15),
        email: "tutor@mail.net",
        username: "tutoruser123",
        firstName: "Tutor",
        lastName: "User",
        sourceInfo: "facebook",
        hashedPassword: {
          create: {
            passwordId: generateId(15),
            hashedPassword: await new Argon2id().hash("secret123"),
          },
        },
        role: "TUTOR",
        isEmailVerified: true,
        profile: {
          create: {
            profileId: generateId(15),
            image:
              "https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            bio: "I am an experienced reading tutor with over 10 years of dedicated work in the field of literacy education. With a background in Elementary Education and a Master's degree in Literacy Studies, Jane has helped hundreds of students improve their reading comprehension, vocabulary, and fluency. She specializes in working with young learners who struggle with reading, offering personalized, one-on-one sessions tailored to each student's unique learning style.",
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

    // Create Inhouse Tutor
    // const id = generateId(15);
    // await prisma.inHouseTutor.upsert({
    //   where: { id: id },
    //   update: {},
    //   create: {
    //     id: id,
    //     name: "John Doe",
    //     subjectTaught: "Math",
    //     bio: "I am an experienced reading tutor with over 10 years of dedicated work in the field of literacy education. With a background in Elementary Education and a Master's degree in Literacy Studies, Jane has helped hundreds of students improve their reading comprehension, vocabulary, and fluency. She specializes in working with young learners who struggle with reading, offering personalized, one-on-one sessions tailored to each student's unique learning style.",
    //     image:
    //       "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     socials: {
    //       create: {
    //         id: generateId(15),
    //         facebook: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //         linkedIn: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //         tiktok: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    //       },
    //     },
    //   },
    // });

    // Create Community feedback
    // const id = generateId(15);
    // await prisma.communityFeedback.upsert({
    //   where: { id: id },
    //   update: {},
    //   create: {
    //     id: id,
    //     name: "John Doe",
    //     location: "Quezon City",
    //     occupation: "Web Developer",
    //     comment:
    //       "As a developer, I've found this platform to be incredibly well-designed and efficient. The intuitive interface and smooth user experience made it easy to integrate my online tutorials and manage my sessions seamlessly. The platform's robust set of features, such as scheduling and student interaction tools, saved me a lot of development time. It's clear that a lot of thought went into making this platform both teacher- and developer-friendly, and it's been a valuable tool in helping me expand my online teaching presence. Highly recommend for anyone in the education tech space!",
    //     image:
    //       "https://images.pexels.com/photos/8129903/pexels-photo-8129903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
