export const load = async ({ fetch, params, depends }) => {
  depends("course-posts:load-posts");
  const getAllPosts = async () => {
    const university = params.universityName;
    const course = params.universityCourse;

    const response = await fetch(`/api_v2/course/${university}/${course}`);
    const data = await response.json();

    return data;
  };
  return { data: getAllPosts() };
};
