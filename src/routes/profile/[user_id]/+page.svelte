<script>
  import Profile_Course from "../../../lib/components/Profile_courses.svelte"
  export let data;

  $: user_information = data.user_data;
</script>

<Profile_Course userName={user_information.userName} userCourses={user_information.courses}/>

