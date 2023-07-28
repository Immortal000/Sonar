import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";
import { split } from "postcss/lib/list";

const db = new PrismaClient();

export const GET = async ({ params, url }) => {
  const user_id = params.userID;

  const include = split(url.searchParams.get("include"), ",");
  const posts = include.includes("posts");
  const post_upvotes = include.includes("post_upvotes");
  const reply_upvotes = include.includes("reply_upvotes");
  const replies = include.includes("replies");
  const courses = include.includes("courses");

  const user_info = await db.user.findFirst({
    where: {
      userID: user_id,
    },
    include: {
      university: true,
      posts,
      post_upvotes,
      reply_upvotes,
      replies,
      courses,
    },
  });

  return new Response(JSON.stringify(user_info));
};

export const PATCH = async ({ request, params }) => {
  const update_info = await request.json();
  const user_id = params.userID;

  await db.user.update({
    where: {
      id: user_id,
    },
    data: update_info,
  });
};
