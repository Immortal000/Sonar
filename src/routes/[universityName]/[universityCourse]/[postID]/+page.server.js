export const load = () => {
  const getPostInformation = async () => {
    const response = await fetch(`/api/post/${postID}`);
    const data = await response.json();

    return data;
  };

  return {
    posts: getPosts(),
  };
};
