export const load = async ({ fetch, depends, parent, url, locals }) => {
  return {
    session: await locals.getSession(),
  };
};
