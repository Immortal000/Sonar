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
<div class="min-w-[525px] w-2/5 h-full flex text-center flex-col m-auto">
  <h1 class="text-[65px] font-semibold py-4 mt-8 leading-tight">Find any course <br/> at any university</h1>
    <h2 class="text-xl py-4">
      {#if !!found_university}
      Find a <b class="text-dark-primary">course</b> at {found_university.name}
      {:else}
        Enter your <b class="text-dark-primary">school</b> to start
      {/if}
    </h2>
  <SearchBar bind:searched_university={found_university}/>
  <h3 class="text-md py-1">
    {#if !!found_university}
      <button on:click={() => {
        found_university = null
        }}>Look for a course at a different school</button>
    {:else}
      Look up by course name
    {/if}

  </h3>
  <h2 class="text-xl py-20 text-light-text">Learn from <b>real students</b> about any class! <br/>From tips for passing to questions to due<br/>dates to info on professors</h2>
</div>