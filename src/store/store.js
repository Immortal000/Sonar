import { writable } from "svelte/store";
import { auth } from "../firebase";

export const authStore = writable({
  user: null,
  loading: true,
  data: null,
});

export const uniStore = writable({
  universityName: null,
  universityCourses: [],
});

// will have to implement paginations for posts
export const postsStore = writable({
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
