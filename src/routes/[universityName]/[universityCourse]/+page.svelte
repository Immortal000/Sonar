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
  let modal = false;

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

  const togglePost = () => {
    modal = !modal;
  };
</script>

<div class="container">
  <!-- <Navbar /> -->
  <!-- <input type="text" bind:value={post_title} />
  <input type="text" bind:value={post_description} />

  <button on:click={createPost}> Ask a question </button> -->
  <h1>Current uni: {university}</h1>
  <button on:click={togglePost} class="bg-blue-500 rounded px-4 py-2 text-white"
    ><i class="fa-solid fa-plus text-white pr-1" />Post</button
  >
  {#if modal}
    <div class="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full z-20">
      <div class="w-2/5 mx-auto bg-white rounded mt-52">
        <form action={createPost} class="w-full p-4 flex flex-col relative z-30 gap-2">
          <button on:click={togglePost}>
            <i class="fa-solid fa-x absolute right-2 top-2" />
          </button>
          <span>You are posting to course: {$page.url.pathname.split("/")[2]}</span>
          <label for="">Title</label>
          <input type="text" bind:value={post_title}  class="border border-black rounded px-1" required/>
          <label for="">Description</label>
          <input type="text" bind:value={post_description} class="border border-black rounded" required/>
          <button type="submit" class="rounded bg-blue-500 px-2 py-2">Submit</button>
        </form>
      </div>
    </div>
  {/if}
</div>
