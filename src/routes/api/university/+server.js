import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const GET = async ({ url }) => {
  const university = url.searchParams.get("university");
  const university_information = await db.university.findFirst({
    where: {
      name: university,
    },
    include: {
      posts: true,
      members: true,
      courses: true,
    },
  });

  return new Response(JSON.stringify(university_information));
};

export const POST = async (event) => {
  const data = event.request.json();
  const university_name = data.university_name;

  const new_university = await db.university.create({
    name: university_name,
  });

  return new Response("New university added!");
};
