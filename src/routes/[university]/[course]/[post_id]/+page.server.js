export const load = ({ fetch, params, depends }) => {
  const get_post_information = async () => {
    const response = await fetch(`/api_v2/posts/${params.post_id}`);
    const post_data = await response.json();

    return post_data;
  };

  return {
    data: get_post_information(),
  };
};
