<script>
  import "../styles/app.css";
  import { auth, db, provider } from "../firebase";
  import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
  import { authStore } from "../store/store.js";

  const loginWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log("ERROR WITH SIGN UP");
      });
  };

  const signOutWithGoogle = async () => {
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
  };
</script>

<nav class="flex justify-between w-10/12 m-auto py-5">
  <div>
    <ul class="flex justify-between">
      <li class="mr-3">
        <a
          class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
          href="#">Home</a
        >
      </li>
      <li class="mr-3">
        <a
          class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
          href="#">About Us</a
        >
      </li>
      <li class="mr-3">
        <a
          class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
          href="#">Contact</a
        >
      </li>
    </ul>
  </div>
  {#if $authStore.user}
    <button on:click={signOutWithGoogle}>
      <a class="inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" href="#"
        >Sign Out
      </a>
    </button>
  {:else}
    <button on:click={loginWithGoogle}>
      <a class="inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" href="#"
        >Login
      </a>
    </button>
  {/if}
</nav>
