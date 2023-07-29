import { error } from "@sveltejs/kit";

export const load = async ({ params, fetch, depends }) => {
  depends("load-course-information");
  const get_course_info = async () => {
    const response = await fetch(`/api_v2/course/${params.university}/${params.course}?include=users,posts`);
    const course_info = await response.json();

    // If this course doesnt exist
    if (!!!course_info) {
      throw error(404, `Course ${params.course} not found`);
    }

    return course_info;
  };

  return {
    data: get_course_info(),
  };
};
