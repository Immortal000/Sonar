import { goto } from "$app/navigation";
import { error, redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

export const load = async ({}) => {};

export const actions = {
  create: async ({ request, params }) => {
    const form_data = await request.formData();
    const post_title = form_data.get("post_title");
    const post_content = form_data.get("post_content");
  },

  delete: async ({}) => {},

  update: async ({}) => {},

  pin: async ({}) => {},
};
