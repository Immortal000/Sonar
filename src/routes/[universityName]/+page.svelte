<script>
  // university website
  // import tailwind styles
  import "../../styles/app.css";

  // page params
  import { page } from "$app/stores";
  const university = $page.params.universityName;
  let courseSelected = "";

</script>

<div class="w-full flex justify-center">
  <div class="w-8/10 flex flex-col">
    <h1>Current University: {university}</h1>
    <div class="flex justify-between">
      <select name="courses" id="" bind:value={courseSelected}  class="w-1/3 text-black border rounded border-gray-500">
        <option value="" disabled selected>Select a Course</option>
        <option value="course1" >CSC121</option>
        <option value="course2">ENGR216</option>
      </select>

      <select name="preference" id="" placeholder="Filter" bind:value={courseSelected}  class="w-1/3 text-black border rounded border-gray-500">
        <option value="Recent" >Recent</option>
        <option value="Most Popular">Most Popular</option>
      </select>
    </div>
    
    {courseSelected}
  </div>
</div>
