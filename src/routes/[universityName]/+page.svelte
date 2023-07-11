<script>
  // university website
  // import tailwind styles
  import "../../styles/uni.css";

  // page params
  import { page } from "$app/stores";
  const university = $page.params.universityName;
</script>

<h1>Current University: {university}</h1>
