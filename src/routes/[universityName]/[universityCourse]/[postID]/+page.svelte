<script>
  import { addReplyToPost } from "../../../../functions/post";
  import { page } from "$app/stores";

  export let data;
  let reply_content = "";
</script>

<!-- the actual post -->
<h1>{data.data.title}</h1>
<p>{data.data.content}</p>

<input type="text" placeholder="reply here..." bind:value={reply_content} />
<button on:click={() => addReplyToPost($page.params.postID, reply_content)}>Post reply</button>
