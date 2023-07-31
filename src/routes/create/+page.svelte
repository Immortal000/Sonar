<script>
  import "../../styles/app.css";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";

  export let data;
  $: universities = $page.data.available_unis;
  let current_university_select;
</script>

<form action="/create" method="POST" use:enhance on:submit|preventDefault>
  <select name="university" bind:value={current_university_select}>
    {#each universities as university}
      <option value="{university}.name">{university.name}</option>
    {/each}
  </select>

  {#if !!current_university_select}
    <select name="courses" id="courses">
      {#each data.available_unis[current_university_select] as course}
        <option value={course}>{course}</option>
      {/each}
    </select>
  {/if}

  <input type="text" placeholder="title" name="post_title" required />
  <input type="text" placeholder="content" name="post_content" required />
  <button type="submit">Submit Post</button>
</form>
