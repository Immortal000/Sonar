import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const GET = async ({ url }) => {
  const post_id = url.pathname.split("/")[3];

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
