import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const POST = async (event) => {
  const update_info = await event.request.json();
  const user_id = await event.params.userID;
  const cookies = await event.cookies.getAll();
  //   const user_update = await db.user.update({});

  console.log(cookies);

  return new Response("Testing...");
};
