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

  console.log("Added new post");
  return new Response("Got your request");
};

export const GET = async ({ url }) => {
  const course = url.searchParams.get("course");
  const university = url.searchParams.get("university");
  const posts = await db.post.findMany();
  return new Response(JSON.stringify(posts));
};
