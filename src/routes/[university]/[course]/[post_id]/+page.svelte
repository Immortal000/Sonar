<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  export let data;

  console.log(data.post_data);
</script>

<form method="POST" use:enhance on:submit|preventDefault>
  <button formaction="?/upvote_post">Test button</button>
</form>
