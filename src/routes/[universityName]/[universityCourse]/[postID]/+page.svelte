<script>
  import { addReplyToPost } from "../../../../functions/post";
  import { page } from "$app/stores";

  export let data;
  $: replies = data.data.replies;

  $: post_title = data.data.post_title;
  $: post_content = data.data.post_content;

  let reply_content = "";
</script>

<!-- the actual post -->
<h1>{data.data.title}</h1>
<p>{data.data.content}</p>

<!-- Replies -->
{#each replies as reply}
  <p>{reply.content}</p>
{/each}

<input type="text" placeholder="reply here..." bind:value={reply_content} />
<button on:click={() => addReplyToPost($page.params.postID, reply_content)}>Post reply</button>
