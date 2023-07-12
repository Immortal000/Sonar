<script>
  // css
  import "../styles/app.css";
  // components
  import Navbar from "../components/Navbar.svelte";

  import { onMount } from "svelte";
  import { auth, db, provider } from "../firebase";
  import { authStore, errorStore } from "../store/store.js";

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
  <!-- Error stuff -->
  {#if $errorStore.error == true && $errorStore.error_type == "auth"}
    <div
      class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-5 ml-5 absolute bottom-0 left-0"
      role="alert"
    >
      <p class="font-bold">Error!</p>
      <p>Log In first dumb bitch 💀</p>
    </div>
  {/if}

  <Navbar />
  <slot />
</div>
