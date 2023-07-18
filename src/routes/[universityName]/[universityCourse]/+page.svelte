<script>
  // university course
  // css
  import "../../../styles/app.css";

  import { authStore, errorStore } from "../../../store/store.js";

  import { onMount } from "svelte";

  import { page } from "$app/stores";
  import { auth } from "../../../firebase";

  const university = $page.params.universityName;
  const course = $page.params.universityCourse;

  import Post from "../../../schemas/post.js";

  // mounting stuff
  onMount(() => {
    const unsubscribe = () => {};
  });

  // create the json and add the data to firebase
</script>

<div class="container">
  <!-- <Navbar /> -->
  <!-- <input type="text" bind:value={post_title} />
  <input type="text" bind:value={post_description} />

  <button on:click={createPost}> Ask a question </button> -->
  <h1>Current uni: {university}</h1>
</div>
