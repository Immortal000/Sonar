<script>
  import { invalidate, goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";
  import { signIn, signOut } from "@auth/sveltekit/client";
  import { page } from "$app/stores";

  let university_select;

  onMount(() => {
    signIn("google");
  });
</script>
