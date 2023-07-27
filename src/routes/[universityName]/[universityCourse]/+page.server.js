export const load = async ({ fetch, params }) => {
  const university = params.universityName;
  const course = params.universityCourse;

  const response = await fetch(`/api/posts?university=${university}&course=${course}`);
  const data = await response.json();

  return { data };
};
