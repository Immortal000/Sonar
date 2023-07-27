import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { provider } from "../firebase";
import { authStore } from "../store/store";
import { page } from "$app/stores";

/**
 * Log the user in based on google auth provided by firebase
 * If the user is present, do nothing. If the user isnt present in the database, add a new record.
 * @param {*} university the university the user is part of
 */
export const user_log_in = async (university) => {
  signInWithPopup(getAuth(), provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      const new_user_prisma = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          user_id: user.uid,
          user_name: user.displayName,
          university: university,
        }),
      });

      console.log("Prisma user added");
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Signout the user
 */
export const user_log_out = async () => {
  signOut(auth)
    .then(() => {
      console.log("Signed out, fuck you!");
    })
    .catch((error) => {
      console.log("Couldnt even sign out right dumbo :P");
    });
};
