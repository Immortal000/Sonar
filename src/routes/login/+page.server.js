import prisma from "../../lib/prisma";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals, depends }) => {
  depends("load:login-page");
  const session = await locals.getSession();

  if (session?.user) {
    const uid = session?.user.sub;
    const user_exists = await prisma.user.findFirst({
      where: { userID: uid },
    });

    if (!!!user_exists) {
      const new_user = await prisma.user.create({
        data: {
          userID: uid,
          userName: session.user.name,
          profile_image: session.user.picture,
          email: session.user.email,
        },
      });
    }

    throw redirect(303, "/");
  }
  return {
    session,
  };
};

export const actions = {
  default: async ({ request }) => {
    console.log(request);
  },
};
