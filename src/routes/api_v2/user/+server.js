import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";
import prisma from "../../../lib/prisma";

const db = new PrismaClient();

export const GET = async ({ locals }) => {
  const session = await locals.getSession();
  return new Response(JSON.stringify(session.user));
};

export const POST = async ({ request }) => {
  const new_user_data = await request.json();
  let new_user;

  const exists = await db.user.count({
    where: {
      userID: new_user_data.user_id,
    },
  });

  if (!!exists == false) {
    new_user = await db.user.create({
      data: {
        userID: new_user_data.user_id,
        userName: new_user_data.user_name,
        profile_image: new_user_data.photoURL,
        university: {
          connect: {
            name: new_user_data.university,
          },
        },
      },
    });

    return new Response(new_user_data, { status: 200 });
  }

  return new Response("Successful Request", { status: 500, statusText: "User already exists!" });
};
