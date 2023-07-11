import { writable } from "svelte/store";
import { auth } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

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
  signup: async (auth, provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        console.log("I HATE ERRORS, IM GONNA KMS");
      });
  },
  logout: async (auth) => {
    signOut(auth)
      .then(() => {
        console.log("Signed out, fuck you!");
        authStore.update((current) => {
          return { user: null };
        });
      })
      .catch((error) => {
        console.log("Couldnt even sign out right dumbo :P");
      });
  },
};
