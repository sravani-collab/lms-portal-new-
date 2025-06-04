import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a course
  const course = await prisma.course.create({
    data: {
      title: 'Introduction to Computer Networks',
      description: 'Learn the basics of networking.',
      modules: {
        create: [
          {
            title: 'Module 1: Introduction',
            lessons: {
              create: [
                { title: 'Lesson 1.1: Overview' },
                { title: 'Lesson 1.2: Basics' },
              ],
            },
          },
          {
            title: 'Module 2: OSI Models',
            lessons: {
              create: [
                { title: 'Lesson 2.1: Layers' },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`Course created: ${course.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
