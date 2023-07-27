import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const POST = async (event) => {
  const data = await event.request.json();

  const reply_thing = await db.replies.create({
    data: {
      upvotes: 0,
      content: data.content,
      user: {
        connect: {
          userID: data.user_id,
        },
      },
      post: {
        connect: {
          id: data.post_id,
        },
      },
    },
  });

  return new Response(JSON.stringify(reply_thing));
};
