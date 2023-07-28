import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const POST = async (event) => {
  const post_data = await event.request.json();
  const course = post_data.course;
  const university = post_data.university;
  const user_id = post_data.user_id;

  const new_post = await db.post.create({
    data: {
      title: post_data.title,
      content: post_data.content,
      course: {
        connect: {
          name: course,
        },
      },
      published: true,
      user: {
        connect: {
          userID: user_id,
        },
      },
      university: {
        connect: {
          name: university,
        },
      },
    },
  });

  //   return new Response(new_post, {
  //     "Content-Type": "application/json",
  //     status: 200,
  //   });
  return new Response(JSON.stringify(new_post));
};

export const GET = async ({ url }) => {
  const type = url.searchParams.get("type");
  if (type == "all") {
    const course = url.searchParams.get("course");
    const university = url.searchParams.get("university");
    const current_course = await db.course.findFirst({
      where: {
        name: course,
        universityName: university,
      },
      include: {
        posts: true,
      },
    });

    //   console.log(current_course.posts);
    return new Response(JSON.stringify(current_course.posts));
  } else if (type == "specific") {
    const post_id = url.searchParams.get("id");
    console.log(post_id);
    const post_data = await db.post.findFirst({
      where: {
        id: post_id,
      },
      include: {
        university: true,
        course: true,
        user: true,
        replies: true,
      },
    });

    return new Response(JSON.stringify(post_data));
  }
};
