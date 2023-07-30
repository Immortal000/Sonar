import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const POST = async ({ request, params }) => {
  const reply_info = await request.json();
  const post_id = params.postID;

  await db.replies.create({
    data: {
      content: reply_info.content,
      post: {
        connect: {
          id: post_id,
        },
      },
      user: {
        connect: {
          userID: reply_info.userID,
        },
      },
    },
  });

  return new Response("Reply posted!");
};
