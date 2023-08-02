import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const PATCH = async ({ request, params, url }) => {
  const update_info = await request.json();
  const reply_id = await params.replyID;

  await db.replies.update({
    where: {
      id: reply_id,
    },
    data: update_info,
  });
};
