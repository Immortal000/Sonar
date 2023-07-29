<script>
  import "../../../styles/app.css";
  import { course_list, university_list } from "../../../store/index";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";

  export let data;
  $: all_course_posts = data.data;

  // Calls the load function on +page.server.js again
  const refresh = () => {
    invalidate("load-course-information");
  };

  // whenever the component is mounted, refresh to get the new updated information
  onMount(() => {
    refresh();

    return () => {};
  });
</script>
