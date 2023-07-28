export const load = async ({ fetch, params, depends }) => {
  depends("post-replies:view-replies");
  const getAllReplies = async () => {
    let postID = params.postID;

    const response = await fetch(`/api_v2/posts/${postID}`);
    const data = await response.json();

    return data;
  };

  return {
    data: getAllReplies(),
  };
};
