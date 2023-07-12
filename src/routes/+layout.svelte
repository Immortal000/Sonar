<script>
  // components
  import Navbar from "../components/Navbar.svelte";
  import UserPost from "../components/UserPost.svelte";

  import { onMount } from "svelte";
  import { auth, db, provider } from "../firebase";
  import { authStore } from "../store/store.js";

  // mounting the component
  onMount(() => {
    console.log("Mounting!");

    // ubsubscribing from the auth state change listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in!"); // confirmation for user logging in
        // updating the store value with the user data
        authStore.update((current) => {
          return {
            user,
          };
        });
      }
    });
  });
</script>

<div>
  <Navbar />
  <UserPost />
  <slot />
</div>
