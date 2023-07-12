import { writable } from "svelte/store";
import { auth } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { db, provider } from "../firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

export const errorStore = writable({
  error: false,
  error_type: null,
});

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

// database add functions
export const databaseHandler = {
  addPost: async (post) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), post);
      console.log("Added document with ID: ", docRef.id);
    } catch (error) {
      console.log("Error has occured shithead");
      console.log(error);
    }
  },
};

// auth handler
export const authHandler = {
  signup: async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        authStore.update((current) => {
          return {
            user,
          };
        });
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
