export const load = async ({ fetch, params }) => {
  let postID = params.postID;

  const response = await fetch(`/api/posts/${postID}`);
  const data = await response.json();

  return { data };
};
