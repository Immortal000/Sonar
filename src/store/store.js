import { writable } from "svelte/store";
import { auth } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { db, provider } from "../firebase";
import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore";
import userSchema from "../schemas/user.json";

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
  pageNumber: 0,
});

// database add functions
export const databaseHandler = {};

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
        authStore.update(() => {
          return {
            user,
          };
        });

        // update the error state
        errorStore.update(() => {
          return { error: false, error_type: "" };
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
        errorStore.update((current) => {
          return { error: false, error_type: "" };
        });
      })
      .catch((error) => {
        console.log("Couldnt even sign out right dumbo :P");
      });
  },
};
