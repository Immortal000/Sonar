import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const PATCH = async ({ request, url, params }) => {
  const reply_id = params.replyID;
  const upvote_info = await request.json();
  const action = url.searchParams.get("action");

  if (action == "increment") {
    await db.replies.update({
      where: {
        id: reply_id,
      },
      data: {
        upvotes: { increment: 1 },
        user_upvotes: {
          connect: {
            userID: upvote_info.user_id,
          },
        },
      },
    });
  } else if (action == "decrement") {
    await db.replies.update({
      where: {
        id: reply_id,
      },
      data: {
        upvotes: { decrement: 1 },
        user_upvotes: {
          disconnect: {
            userID: upvote_info.user_id,
          },
        },
      },
    });
  }

  return new Response(action);
};
