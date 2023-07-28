import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const GET = async ({ url }) => {
  const user_id = url.searchParams.get("id");
  const user_info = db.user.findFirst({
    where: {
      userID: user_id,
    },
    include: {
      posts: true,
      courses: true,
    },
  });

  return new Response(JSON.stringify(user_info));
};
