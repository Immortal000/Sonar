import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

/**
 * Gets all the post information based on the post id. Used for /university/course/post_id
 * @param {Object} params
 * @returns the stringified post data
 */
export const GET = async ({ params, url }) => {
  const post_id = params.postID;

  const post_data = await db.post.findFirst({
    where: {
      id: post_id,
    },
    include: {
      university: true,
      course: true,
      user: true,
      tags: true,
      replies: {
        orderBy: {
          upvotes: "desc",
        },
      },
    },
  });

  return new Response(JSON.stringify(post_data));
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
    data: new_post_data,
  });
  return new Response(`Post with id: ${post_id} updated!`);
};
