import { redirect } from "@sveltejs/kit";

export const handle = async ({ request, resolve, event }) => {
  // If the origin isnt matched
  if (event.url.origin != "http://localhost:5173") {
    redirect(303, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }

  const response = await resolve(event);
  return response;
};
