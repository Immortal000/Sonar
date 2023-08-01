import prisma from "../../../lib/prisma";

export const load = async ({ params }) => {
  const user_id = params.user_id;

  const get_user_info = async () => {
    const user_data = await prisma.user.findFirst({
      where: {
        userID: user_id,
      },
      include: {
        posts: true,
        courses: true,
      },
    });

    return user_data;
  };
  return { user_data: get_user_info() };
};
