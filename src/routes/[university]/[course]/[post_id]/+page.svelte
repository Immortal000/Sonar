<script>
  import { enhance } from "$app/forms";
  export let data;

  //   console.log(data.test);
</script>

<form method="POST" use:enhance on:submit|preventDefault>
  <button formaction="?/upvote_post">Test button</button>
</form>
