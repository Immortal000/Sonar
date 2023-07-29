import { get, writable } from "svelte/store";
import { auth } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { db, provider } from "../firebase";

const createStore = () => {
  const { subscribe, set, update } = writable({
    user_id: null,
    user_courses: [],
  });

  /**
   * Signs up a user with Google OAuth
   * @param {String} university
   */
  const google_sign_up = async (university) => {
    const response = await signInWithPopup(auth, provider);
    const user = response.user;

    const user_create_request = await fetch("/api_v2/user", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.uid,
        user_name: user.displayName,
        photoURL: user.photoURL,
        university: university,
      }),
    });

    // const user_response_message = user_create_request.statusText;
    if (user_create_request.status === 200) {
      set({
        user_id: user.uid,
        user_courses: [],
      });
    } else if (user_create_request.status === 500) {
      alert("user exists already");
    }
  };

  /**
   * Signs in a user with Google OAuth
   */
  const google_sign_in = async () => {
    const response = await signInWithPopup(auth, provider);
    const user = response.user;

    const login_user_info = await fetch(`/api_v2/user/${user.uid}?include=courses`);
    const user_info = await login_user_info.json();

    console.log(user_info);

    set({
      user_id: user.uid,
      user_courses: [],
    });
  };

  const google_sign_out = async () => {
    const user_info = get(user);
    if (!!user_info.user_id) {
      set({
        user_id: null,
        user_courses: [],
      });
    } else {
      console.log("Need to sign in first");
    }
  };

  const set_user = (user_oject) => {
    set(user_oject);
  };

  return {
    subscribe,
    google_sign_in,
    google_sign_up,
    google_sign_out,
    set_user,
  };
};

export const user = createStore();
