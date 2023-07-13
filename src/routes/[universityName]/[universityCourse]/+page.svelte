<script>
  // university course
  // css
  import "../../../styles/app.css";
  import Navbar from "../../../components/Navbar.svelte";
  import { databaseHandler, authStore, errorStore } from "../../../store/store.js";

  import { onMount } from "svelte";

  import { page } from "$app/stores";
  import { serverTimestamp } from "firebase/firestore";
  import { auth } from "../../../firebase";

  const university = $page.params.universityName;
  const course = $page.params.universityCourse;

  import postSchema from "../../../schemas/post.json";

  // app variables
  let post_title = "";
  let post_description = "";

  // mounting stuff
  onMount(() => {
    const unsubscribe = () => {};
  });

  // create the json and add the data to firebase
  const createPost = async () => {
    if ($authStore.user) {
      // make the request if a user is present. Logged in.
      const post = { ...postSchema };
      post["post"]["post_title"] = post_title; // post title
      post["post"]["post_content"] = post_description; // post description
      post["date_created"] = serverTimestamp(); // time stamp when the request was made
      post["university"]["university_id"] = university; // University id, ex.tamu
      post["university"]["course_id"] = course; // course id, ex.csce120
      post["user"]["user_name"] = $authStore.user["displayName"] || auth.currentUser.displayName; // user name
      post["user"]["user_id"] = $authStore.user.uid || auth.currentUser.uid; // user id

      databaseHandler.addPost(post);
    } else {
      errorStore.update((current) => {
        return {
          error: true,
          error_type: "auth",
        };
      });
    }
  };
</script>

<div class="container">
  <!-- <Navbar /> -->
  <input type="text" bind:value={post_title} />
  <input type="text" bind:value={post_description} />

  <button on:click={createPost}> Ask a question </button>
  <h1>Current uni: {university}</h1>
</div>
