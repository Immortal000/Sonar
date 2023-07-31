<script>
  import { page } from "$app/stores";

  $: all_unis = $page.data.available_unis;
  $: searchable_options = [];

  let search_value = "";
  let searched_university = null;

  const handle_university_search = () => {
    const filtered_universities = all_unis.filter((value) => {
      const name_matches = value.name.toLowerCase().includes(search_value.toLowerCase());

      return name_matches;
    });

    searchable_options = filtered_universities;
  };

  const handle_course_search = () => {
    const matched_courses = searched_university.courses.filter((course) => course.toLowerCase().includes(search_value));

    searchable_options = matched_courses;
  };
</script>

<input
  type="text"
  bind:value={search_value}
  on:input={() => {
    if (!!searched_university) {
      handle_course_search();
    } else {
      handle_university_search();
    }
  }}
  placeholder={!!searched_university ? "Search Courses" : "Search Universities"}
/>
<div class="absolute divide-y divide-gray-500">
  {#each searchable_options as option}
    <option
      value={option.name}
      on:click={() => {
        searched_university = option;
        search_value = "";
        searchable_options = [];
      }}
      >{#if !!searched_university}
        {option}
      {:else}
        {option.name}
      {/if}</option
    >
  {/each}
</div>
