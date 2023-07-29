<script>
  import "../../styles/app.css";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { course_list } from "../../store/index";
  import { user } from "../../store/user";

  $: $course_list = $course_list;
  let university_select;

  onMount(() => {
    invalidate("load-all-universities");
  });
</script>

<!-- Have to check if the name is unique -->
<select name="universities" id="universities" required bind:value={university_select}>
  {#each $course_list as course}
    <option value={course}>{course}</option>
  {/each}
</select>
<button class="bg-red-500" on:click={user.google_sign_up(university_select)}>Sign up with google</button>
<button class="bg-blue-500" on:click={user.google_sign_in}>Sign in with google</button>
