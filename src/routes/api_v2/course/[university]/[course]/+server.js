import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const GET = async ({ params }) => {
  const university = params.university;
  const course = params.course;

  const current_course = await db.course.findFirst({
    where: {
      name: course,
      universityName: university,
    },
    include: {
      users: true,
      posts: {
        include: {
          replies: true,
          user: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(current_course));
};

export const POST = async ({ params, request }) => {
  const university = params.university;
  const course = params.course;

  console.log(university, course);

  db.course.create({
    data: {
      name: course,
      university: {
        connect: {
          name: university,
        },
      },
    },
  });

  return new Response(`New course with name ${course} was created!`);
};
