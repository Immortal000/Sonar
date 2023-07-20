<script>
  // university course
  // css
  import "../../../styles/app.css";
  import Navbar from "../../../components/Navbar.svelte";
  import PostContainer from "../../../components/PostContainer.svelte";
  import UserPost from "../../../components/UserPost.svelte";

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
    await postsHandler.getAllPosts(university, course);
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

  <button on:click={createPost}> Ask a question </button>
  <button on:click={updatePosts}>Load More</button>

  {#if $postsStore.postsInfo.length != 0}
    {#each $postsStore.postsInfo as post}
      <UserPost
        postTitle={post.post.post_title}
        course={post.university.course_id}
        postMessage={post.post.post_content}
        userName={post.user.user_name}
      />
    {/each}
  {:else}
    <h1>No Posts...</h1>
  {/if}
</div>
