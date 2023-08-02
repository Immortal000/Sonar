import { fail, redirect } from "@sveltejs/kit";
import prisma from "../../lib/prisma";

export const load = async ({ locals, depends }) => {
  // check if user is logged in and redirect them if they havent
  const session = await locals.getSession();

  if (!session?.user) {
    throw redirect(303, "https://www.youtube.com/watch?v=dQw4w9WgXcQ"); // do not change this
  }

  return {};
};

export const actions = {
  default: async ({ request, locals }) => {
    const session = await locals.getSession();
    const form_data = await request.formData();

    if (!session?.user) {
      return fail(400, { name: "user", logged_in: false });
    }

    const user_id = session.user.sub;

    await prisma.post.create({
      data: {
        title: form_data.get("post_title"),
        content: form_data.get("post_content"),
        university: {
          connect: {
            name: form_data.get("university"),
          },
        },
        course: {
          connect: {
            name: form_data.get("courses"),
          },
        },
        user: {
          connect: {
            userID: user_id,
          },
        },
      },
    });

    console.log("post created!");
  },
};
