import { writeable } from "svelte/store";
import { auth } from "../firebase";

export const authStore = writeable({
  user: null,
  loading: true,
  data: null,
});

export const uniStore = writeable({
  universityName: null,
  universityCourses: [],
});

// will have to implement paginations for posts
export const postsStore = writeable({
  posts: [],
});

export const authHandler = {
  signup: async (userID) => {
    await signupWithGoogle(userID);
  },
  login: async (userID) => {
    await signinWithGoogle(userID);
  },
  logout: async () => {
    await signout(auth);
  },
};
