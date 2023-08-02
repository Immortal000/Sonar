import prisma from "../lib/prisma";

export const load = async ({ fetch, depends, parent, url, locals }) => {
  const get_available_universities = async () => {
    const all_universities = await prisma.university.findMany({
      include: {
        courses: true,
      },
    });
    // const all_universities_array = all_universities.map((university) => university.name);
    const university_list = [];
    for (const university of all_universities) {
      let university_dict = { name: university.name, courses: university.courses.map((course) => course.name) };
      university_list.push(university_dict);
    }

    return university_list;
  };

  return {
    session: await locals.getSession(),
    available_unis: get_available_universities(),
  };
};
