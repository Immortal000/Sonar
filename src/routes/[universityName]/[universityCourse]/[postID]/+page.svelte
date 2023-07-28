<script>
  import { addReplyToPost } from "../../../../functions/post";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { invalidate } from "$app/navigation";

  const refresh = () => {
    invalidate("post-replies:view-replies");
  };

  onMount(() => {
    refresh();
    return () => {};
  });

  export let data;
  $: replies = data.data.replies;

  $: post_title = data.data.post_title;
  $: post_content = data.data.post_content;

  let reply_content = "";
</script>

<!-- the actual post -->
<div class="border-2 border-blue-500 p-5 m-5 w-2/3">
  <h1>{data.data.title}</h1>
  <p>{data.data.content}</p>
</div>

<!-- Replies -->
{#each replies as reply}
  <div class="border-2 border-blue-500 p-5 m-5 ml-20 w-1/2">
    <p>{reply.content}</p>
  </div>
{/each}

<input type="text" placeholder="reply here..." bind:value={reply_content} />
<button
  on:click={async () => {
    await addReplyToPost($page.params.postID, reply_content);
    refresh();
  }}>Post reply</button
>
