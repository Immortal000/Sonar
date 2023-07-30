import { auth } from "../../../firebase/client";
export const load = async ({ params }) => {
  const user_id = params.user;

  return { data: null };
};
