export const load = async ({ fetch, depends }) => {
  depends("load-all-universities");
  const get_all_universities = async () => {
    const response = await fetch("/api_v2/course");
    const all_universities = await response.json();

    return all_universities;
  };

  return {
    data: get_all_universities(),
  };
};
