<script>
  // IMPORTS
  import "../lib/styles/app.css"; // tailwind CSS
  import SearchBar from "../lib/components/Search_bar.svelte";

  // VARIABLES
  export let data; // the data we get from 'page.server.js'
  $: all_universities = data.home_data; // Reactive statement

  // FUNCTIONS
</script>

<!-- MAIN HOME PAGE -->
<h1>Main page</h1>
<SearchBar />
