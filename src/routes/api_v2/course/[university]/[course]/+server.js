import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";
import { split } from "postcss/lib/list";

const db = new PrismaClient();

export const GET = async ({ params, url }) => {
  const university = params.university;
  const course = params.course;

  const include = split(url.searchParams.get("include"), ",");

  const replies = include.includes("replies");
  const users = include.includes("users");
  const tags = include.includes("tags");

  const current_course = await db.course.findFirst({
    where: {
      name: course,
      universityName: university,
    },
    select: {
      users: true,
      university: true,
      course_professors: true,
      users,
      posts: {
        include: {
          replies,
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
