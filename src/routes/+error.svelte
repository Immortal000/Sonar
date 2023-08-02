<!-- ERROR PAGE -->
<script>
  import "../lib/styles/app.css"; // tailwind CSS
  import { page } from "$app/stores";
</script>

<h1 class="text-3xl">{$page.error.message}</h1>
