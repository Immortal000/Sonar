import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/**
 * Creates a new post
 * @param {Object} params
 * @returns
 */
export const POST = async ({ params, request }) => {
  const post_data = await request.json();
  const course = post_data.course;
  const university = post_data.university;
  const user_id = post_data.user_id;

  await db.post.create({
    data: {
      title: post_data.title,
      content: post_data.content,
      course: {
        connect: {
          name: course,
          universityName: university,
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

  //   console.log(new_post);
  return new Response(JSON.stringify({ success: true }));
};
