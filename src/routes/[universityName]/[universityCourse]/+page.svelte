<script>
  // university course
  // css
  import "../../../styles/app.css";
  import Navbar from "../../../components/Navbar.svelte";

  import { page } from "$app/stores";
  const course = $page.params.universityCourse;
</script>

<div class="container">
  <Navbar />
</div>
