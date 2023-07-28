export const load = async ({ fetch, params }) => {
  const getUserInfo = async () => {
    const user_id = params.userID;
    console.log(user_id);

    const user_info = await fetch(`/api/users?id=${user_id}`);
    const data = await user_info.json();

    return data;
  };

  return { data: getUserInfo() };
};
