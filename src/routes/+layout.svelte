<!-- LAYOUT OF THE ENTIRE WEB PAGE
    - Header -> Navbar 
    - Main Content -> This will be the "SLOT"
    - Footer
-->

<script>
  import { error } from "@sveltejs/kit";
  import { page } from "$app/stores";
  import { university_list, course_list } from "../store/index";

  $: current_university = $page.params.university;
  $: current_course = $page.params.course;

  $: check_for_error();

  // CHECK FOR AVAILABLE ROUTES
  const check_for_error = () => {
    if (!!current_university) {
      if (!$university_list.includes(current_university)) {
        throw error(404, {
          message: "University not found 💀",
        });
      }
    }
  };
</script>

<slot />
