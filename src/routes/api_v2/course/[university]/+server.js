import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const GET = async ({ params }) => {
  const all_courses = await db.course.findMany({
    where: {
      universityName: params.university,
    },
  });

  return new Response(JSON.stringify(all_courses));
};
