import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const GET = async ({ url }) => {
  const user_id = url.searchParams.get("id");
  const user_info = await db.user.findFirst({
    where: {
      userID: user_id,
    },
    include: {
      posts: true,
      courses: true,
      replies: true,
    },
  });

  console.log(user_info);

  return new Response(JSON.stringify(user_info));
};

export const POST = async (event) => {
  const data = await event.request.json();
  const exists = !!(await db.user.count({
    where: {
      userID: data.user_id,
    },
  }));

  if (!exists) {
    const user_update = await db.user.create({
      data: {
        userID: data.user_id,
        userName: data.user_name,
        university: {
          connect: {
            name: data.university,
          },
        },
      },
    });

    return new Response(JSON.stringify(user_update));
  } else {
    const exist_user = await db.user.findFirst({
      where: {
        userID: data.user_id,
      },
    });

    return new Response(JSON.stringify(exist_user));
  }
};
