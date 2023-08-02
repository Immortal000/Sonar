import { invalidate } from "$app/navigation";
import prisma from "../../../../lib/prisma";
import { fail } from "@sveltejs/kit";

export const load = async ({ depends, params }) => {
  depends("load:post-information");
  const post_id = params.post_id;
  const get_post_info = async () => {
    const post_info = await prisma.post.findFirst({
      where: {
        id: post_id,
      },
      include: {
        replies: true,
      },
    });

    return post_info;
  };

  const generate_reply_tree = async () => {
    const parent_replies = await prisma.replies.findMany({
      where: {
        post: {
          id: post_id,
        },
      },
      include: {
        replies: true,
      },
    });

    // have to use recursion to get all the replies, I wanna kms
    const reply_tree = parent_replies.map(async (reply) => {});
  };

  return {
    post_data: get_post_info(),
  };
};

export const actions = {
  add_reply_post: async ({ params, request, locals }) => {
    // invalidate("load:post-information");
    const session = await locals.getSession();
    if (!!!session?.user) {
      return fail();
    }

    const form_data = await request.formData();
    const post_id = params.post_id;
    await prisma.replies.create({
      data: {
        content: form_data.get("reply"),
        post: {
          connect: {
            id: post_id,
          },
        },
      },
    });
  },
  add_reply_to_reply: async ({ params, request, locals, url }) => {
    const session = await locals.getSession();
    if (!!!session?.user) {
      return fail();
    }

    const form_data = await request.formData();
    const post_id = params.post_id;
    const reply_id = url.searchParams.get("reply_id");
    await prisma.replies.create({
      data: {
        content: form_data.get("reply"),
        parentReply: {
          connect: {
            id: reply_id,
          },
        },
        user: {
          connect: {
            userID: session.user.sub,
          },
        },
      },
    });
  },
  upvote_post: async ({ params, request, locals, url }) => {
    const session = await locals.getSession();
    if (!!!session?.user) {
      return fail();
    }

    const post_id = params.post_id;

    const already_upvoted = !!(await prisma.user.findFirst({
      where: {
        userID: session.user.sub,
        post_upvotes: {
          some: {
            id: post_id,
          },
        },
      },
    }));

    if (!already_upvoted) {
      await prisma.post.update({
        where: {
          id: post_id,
        },
        data: {
          upvotes: { increment: 1 },
        },
      });

      await prisma.user.update({
        where: {
          userID: session.user.sub,
        },
        data: {
          post_upvotes: {
            connect: {
              id: post_id,
            },
          },
        },
      });
    }
  },
  upvote_reply: async ({ params, request, locals, url }) => {
    const session = await locals.getSession();
    if (!!!session?.user) {
      return fail();
    }

    const reply_id = url.searchParams.get("reply_id");
  },
  remove_upvote_post: async ({ params, request, locals, url }) => {
    const session = await locals.getSession();
    if (!!!session?.user) {
      return fail();
    }

    const post_id = params.post_id;

    const already_upvoted = !!(await prisma.user.findFirst({
      where: {
        userID: session.user.sub,
        post_upvotes: {
          some: {
            id: post_id,
          },
        },
      },
    }));

    if (already_upvoted) {
      await prisma.post.update({
        where: {
          id: post_id,
        },
        data: {
          upvotes: { decrement: 1 },
        },
      });

      await prisma.user.update({
        where: {
          userID: session.user.sub,
        },
        data: {
          post_upvotes: {
            disconnect: {
              id: post_id,
            },
          },
        },
      });
    }
  },
  remove_upvote_reply: async ({}) => {},
  delete: async ({ params, request, locals, url }) => {
    const session = await locals.getSession();
    if (!!!session?.user) {
      return fail();
    }

    const post_id = params.post_id;
    const reply_id = url.searchParams.get("reply_id");
    const type = url.searchParams.get("type");

    if (type == "post") {
      const user_posted = await prisma.post.findFirst({
        where: {
          id: post_id,
        },
        include: {
          user: true,
        },
      });

      if (user_posted.user.userID == session.user.sub) {
        await prisma.post.delete({
          where: {
            id: post_id,
          },
        });
      }
    } else if (type == "reply") {
      const user_posted = await prisma.replies.findFirst({
        where: {
          id: reply_id,
        },
        include: {
          user: true,
        },
      });

      if (user_posted.user.userID == session.user.sub) {
        await prisma.replies.delete({
          where: {
            id: reply_id,
          },
        });
      }
    }
  },
  update: async ({}) => {},
  approve: async ({}) => {},
};
