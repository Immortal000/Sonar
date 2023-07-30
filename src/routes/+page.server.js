import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, depends, parent, url, locals }) => {
  const get_all_universities = async () => {
    const response = await fetch("/api_v2/course");
    const all_universities = await response.json();
    return all_universities;
  };

  return {
    home_data: get_all_universities(),
  };
};
