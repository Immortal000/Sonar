<script>
  import { page } from "$app/stores";

  $: all_unis = $page.data.available_unis;
  $: searchable_options = [];

  let search_value = "";
  export let searched_university = null;

  const handle_university_search = () => {
    if (search_value == "") {
      searchable_options = [];
    } else {
      const filtered_universities = all_unis.filter((value) => {
        const name_matches = value.name.toLowerCase().includes(search_value.toLowerCase());

        return name_matches;
      });

      searchable_options = filtered_universities;
    }
  };

  const handle_course_search = () => {
    const matched_courses = searched_university.courses.filter((course) => course.toLowerCase().includes(search_value));

    searchable_options = matched_courses;
  };
</script>

<div class="border-2 border-gray-300 rounded-2xl w-full">
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
    placeholder={!!searched_university ? "search for a course" : "search for a university"}
    class="w-full px-2 border-2 rounded-2xl"
  />
  <div class="relative divide-y divide-gray-500 w-full">
    {#each searchable_options as option}
      <option
        value={option.name}
        on:click={() => {
          searched_university = option;
          search_value = "";
          searchable_options = searched_university.courses;
        }}
        >{#if !!searched_university}
          {option}
        {:else}
          {option.name}
        {/if}</option
      >
    {/each}
  </div>
</div>
