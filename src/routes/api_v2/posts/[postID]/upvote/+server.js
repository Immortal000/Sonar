import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const PATCH = async ({ request, url, params }) => {
  const post_id = params.postID;
  const upvote_info = await request.json();
  const action = url.searchParams.get("action");

  if (action == "increment") {
    await db.post.update({
      where: {
        id: post_id,
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
    await db.post.update({
      where: {
        id: post_id,
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
