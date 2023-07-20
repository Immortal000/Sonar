import { writable } from "svelte/store";
import { auth } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { db, provider } from "../firebase";
import { doc, setDoc, addDoc, collection, getDoc, query, orderBy, limit } from "firebase/firestore";
import userSchema from "../schemas/user.json";
import { page } from "$app/stores";

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
  postsInfo: [],
  allPosts: [],
  displayPosts: [],
  pageNumber: 0,
});

// database add functions
export const databaseHandler = {};

// posts functions
export const postsHandler = {
  getAllPosts: async (university, course) => {
    const uniRef = doc(db, "universities", university) || {};
    const uni_data = await getDoc(uniRef);
    if (uni_data.exists()) {
      const uni_posts = uni_data.data().courses[course].posts;
      postsStore.update((current) => {
        return { allPosts: uni_posts, displayPosts: [], pageNumber: 0, postsInfo: [] };
      });
    }
  },
};

// auth handler
export const authHandler = {
  signup: async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        // check if user exists in the database
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          let new_user = { ...userSchema };
          new_user["user_id"] = user.uid;
          new_user["user_name"] = user.displayName;
          await setDoc(doc(db, "users", user.uid), new_user);
        }

        // update the current user
        authStore.update((current) => {
          return {
            ...current,
            user,
          };
        });

        // update the error state
        errorStore.update((current) => {
          return { ...current, error: false, error_type: "" };
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
          return { ...current, user: null };
        });
        errorStore.update((current) => {
          return { ...current, error: false, error_type: "" };
        });
      })
      .catch((error) => {
        console.log("Couldnt even sign out right dumbo :P");
      });
  },
};
