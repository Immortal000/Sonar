import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const POST = async (event) => {
  const post_data = await event.request.json();
  const course = post_data.course;
  const university = post_data.university;
  const user_id = post_data.user_id;

  const new_post = await db.post.create({
    data: {
      title: post_data.title,
      content: post_data.content,
      course: {
        connect: {
          name: course,
        },
      },
      published: true,
      user: {
        connect: {
          userID: user_id,
        },
      },
      university: {
        connect: {
          name: university,
        },
      },
    },
  });

  //   return new Response(new_post, {
  //     "Content-Type": "application/json",
  //     status: 200,
  //   });
  return new Response(JSON.stringify(new_post));
};

export const GET = async ({ url }) => {
  const course = url.searchParams.get("course");
  const university = url.searchParams.get("university");
  const current_course = await db.course.findFirst({
    where: {
      name: course,
      universityName: university,
    },
    include: {
      posts: {
        include: {
          replies: true,
          user: true,
        },
      },
    },
  });

  //   console.log(current_course.posts);
  return new Response(JSON.stringify(current_course.posts));
};
