<script>
  import "../../styles/app.css";
  import { course_list } from "../../store/index";

  export let data;
  $: $course_list = data.data.map((x) => x.name); // available courses
</script>
