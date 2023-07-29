import { error } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const GET = async () => {
  const all_unis = await db.university.findMany();
  return new Response(JSON.stringify(all_unis));
};
