<script>
  // university course
  // css
  import "../../../styles/app.css";
  import Navbar from "../../../components/Navbar.svelte";
  import { authStore, errorStore } from "../../../store/store.js";

  import { onMount } from "svelte";

  import { page } from "$app/stores";
  import { auth } from "../../../firebase";

  const university = $page.params.universityName;
  const course = $page.params.universityCourse;

  import Post from "../../../schemas/post.js";

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
      const postClass = new Post(post_title, post_description, "main");
      postClass.createPost();
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
