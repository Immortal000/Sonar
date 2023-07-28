<script>
  // university course
  // css
  import "../../../styles/app.css";
  import Navbar from "../../../components/main/other/Navbar.svelte";
  import PostContainer from "../../../components/main/post/PostContainer.svelte";
  import UserPost from "../../../components/main/post/UserPost.svelte";

  import { authStore, errorStore, postsStore } from "../../../store/store.js";
  import { addPostToPosts } from "../../../functions/post.js";
  import { invalidate } from "$app/navigation";

  import { onMount } from "svelte";

  import { page } from "$app/stores";
  import { auth } from "../../../firebase";

  // app variables
  let post_title = "";
  let post_description = "";
  let university = $page.params.universityName;
  let course = $page.params.universityCourse;

  // mounting stuff
  export let data;
  $: available_posts = data.data;

  const refresh = () => {
    invalidate("course-posts:load-posts");
  };

  onMount(() => {
    refresh();
    return () => {};
  });
</script>

<div class="container">
  <!-- <Navbar /> -->
  <input type="text" bind:value={post_title} />
  <input type="text" bind:value={post_description} />

  <button on:click={addPostToPosts(post_title, post_description)}> Ask a question </button>
  <!-- <button on:click={updatePosts}>Load More</button> -->

  {#if available_posts.length != 0}
    {#each available_posts as post}
      <div
        class="border-2 border-blue-500 m-5 p-5 w-1/3"
        onclick={`window.location='/${university}/${course}/${post.id}';`}
      >
        <p>Asked by: {post.user.userName}</p>
        <p class="text-3xl">{post.title}</p>
        <p class="text-lg">{post.content}</p>
        <p>Answers: {post.replies.length}</p>
      </div>
    {/each}
  {:else}
    <h1>No Posts...</h1>
  {/if}
</div>
