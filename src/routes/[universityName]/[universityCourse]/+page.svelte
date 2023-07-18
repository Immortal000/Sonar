<script>
  // university course
  // css
  import "../../../styles/app.css";

  import { authStore, errorStore, postsHandler, postsStore } from "../../../store/store.js";
  import { createPost, updatePosts } from "../../../schemas/postFunctions";

  import { onMount } from "svelte";

  import { page } from "$app/stores";
  import { auth } from "../../../firebase";

  // app variables
  let post_title = "";
  let post_description = "";
  let university = $page.params.universityName;
  let course = $page.params.universityCourse;

  // mounting stuff
  onMount(async () => {
    // await postsHandler.getAllPosts(university, course);
    updatePosts();
    return () => {
      console.log("Unsubbed");
    };
  });
</script>

<div class="container">
  <!-- <Navbar /> -->
  <input type="text" bind:value={post_title} />
  <input type="text" bind:value={post_description} />

  <button on:click={createPost(post_title, post_description, "main")}> Ask a question </button>
  <button on:click={updatePosts}>Load More</button>
</div>
