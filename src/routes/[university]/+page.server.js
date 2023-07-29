export const load = async ({ params, fetch }) => {
  const current_university = params.university;
  const get_all_courses = async () => {
    const response = await fetch(`/api_v2/course/${current_university}`);
    const all_courses = await response.json();

    return all_courses;
  };

  return {
    data: get_all_courses(),
  };
};
