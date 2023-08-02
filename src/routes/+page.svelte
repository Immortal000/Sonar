<script>
  // IMPORTS
  import "../lib/styles/app.css"; // tailwind CSS
  import SearchBar from "../lib/components/Search_bar.svelte";

  // VARIABLES
  export let data; // the data we get from 'page.server.js'
  $: all_universities = data.home_data; // Reactive statement
  let found_university = null;
  // FUNCTIONS
</script>

<!-- MAIN HOME PAGE -->
<div class="min-w-[380px] w-1/3 h-full flex text-center flex-col m-auto">
  <h1 class="text-5xl font-semibold py-16">Find any course <br/> at any university</h1>
    <h2 class="text-xl py-2">
      {#if !!found_university}
      Find a <b>course</b> at {found_university.name}
      {:else}
        Enter your <b>school</b> to start
      {/if}
    </h2>
  <SearchBar bind:searched_university={found_university}/>
  <h3 class="text-md py-1">
    {#if !!found_university}
      Look for a course at a different school
    {:else}
      Look up by course name
    {/if}

  </h3>
  <h2 class="text-xl py-20">Learn from <b>real students</b> about any class! <br/>From tips for passing to questions to due<br/>dates to info on professors</h2>
</div>