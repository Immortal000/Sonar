<script>
  // university course
  // css
  import "../../../styles/app.css";
  import Navbar from "../../../components/Navbar.svelte";
  import PostContainer from "../../../components/PostContainer.svelte";

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

  <button on:click={createPost}> Ask a question </button> -->
  <!-- <h1>Current uni: {university}</h1>
  <button on:click={togglePost} class="bg-blue-500 rounded px-4 py-2 text-white"
    ><i class="fa-solid fa-plus text-white pr-1" />Post</button
  > -->
  <!-- {#if modal}
    <div class="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full z-20">
      <div class="w-2/5 mx-auto bg-white rounded mt-52">
        <form action={createPost} class="w-full p-4 flex flex-col relative z-30 gap-2">
          <button on:click={togglePost}>
            <i class="fa-solid fa-x absolute right-2 top-2" />
          </button>
          <span>You are posting to course: {course}</span>
          <label for="">Title</label>
          <input type="text" bind:value={post_title} class="border border-black rounded px-1" required />
          <label for="">Description</label>
          <textarea type="text" bind:value={post_description} class="border border-black rounded" required />
          <button type="submit" class="rounded bg-blue-500 px-2 py-2">Submit</button>
        </form>
      </div>
    </div>
  {/if} -->
</div>
