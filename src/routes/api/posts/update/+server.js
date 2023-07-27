import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const POST = async (event) => {
  const data = event.request.json();
  const post_id = data.post_id;
  const new_title = data.title;
  const new_content = data.content;

  const updated_post = db.post.update({
    where: {
      id: post_id,
    },
    data: {
      title: new_title,
      content: new_content,
    },
  });

  return new Response(JSON.stringify(updated_post));
};
