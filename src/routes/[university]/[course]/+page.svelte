<script>
  import "$lib/styles/app.css";
  import { enhance } from "$app/forms";
</script>

<form method="POST" use:enhance on:submit|preventDefault>
  <input type="text" placeholder="post title" name="post_title" required />
  <input type="text" placeholder="post content" name="post_content" required />

  <button formaction="?/create">Submit</button>
</form>
