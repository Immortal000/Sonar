import { fail, redirect } from "@sveltejs/kit";
import prisma from "../../lib/prisma";

export const load = async ({ locals, depends }) => {
  console.log("load-unis");
  depends("load-all-universities");
  // check if user is logged in and redirect them if they havent
  const session = await locals.getSession();

  if (!session?.user) {
    throw redirect(303, "https://www.youtube.com/watch?v=dQw4w9WgXcQ"); // do not change this
  }
  const get_available_universities = async () => {
    const all_universities = await prisma.university.findMany({
      include: {
        courses: true,
      },
    });
    // const all_universities_array = all_universities.map((university) => university.name);
    const university_list = {};
    for (const university of all_universities) {
      university_list[university.name] = university.courses.map((course) => course.name);
    }

    return university_list;
  };

  return {
    // session: await locals.getSession(),
    available_unis: get_available_universities(),
  };
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
