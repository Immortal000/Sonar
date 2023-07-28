import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/**
 * Gets all the post information based on the post id. Used for /university/course/post_id
 * @param {Object} params
 * @returns the stringified post data
 */
export const GET = async ({ params }) => {
  const post_id = params.postID;

  const post_data = await db.post.findFirst({
    where: {
      id: post_id,
    },
    include: {
      university: true,
      course: true,
      user: true,
      replies: {
        orderBy: {
          upvotes: "asc",
        },
      },
    },
  });

  return new Response(JSON.stringify(post_data));
};

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

/**
 * Delete a post that matches the ID
 * @param {Object} params
 * @returns the success message as a response
 */
export const DELETE = async ({ params, request }) => {
  const post_id = params.postID;

  db.post.delete({
    where: {
      id: post_id,
    },
  });

  return new Response(`Post with id: ${post_id} deleted!`);
};

/**
 * Updates a post that matches the ID
 * @param {Object} params
 * @returns the success message
 */
export const PATCH = async ({ params, request }) => {
  const post_id = params.postID;
  const new_post_data = await request.json();
  await db.post.update({
    where: {
      id: post_id,
    },
    data: {
      content: new_post_data.content,
      title: new_post_data.title,
    },
  });
  return new Response(`Post with id: ${post_id} updated!`);
};
