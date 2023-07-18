<script>
  import PostContainer from "../../components/PostContainer.svelte";
  let post_title;
  let post_content;
</script>

<div>
  <PostContainer bind:post_title bind:post_content />
</div>
