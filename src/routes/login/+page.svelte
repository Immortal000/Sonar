<script>
  import { onMount } from "svelte";
  import { signIn } from "@auth/sveltekit/client";

  onMount(() => {
    signIn("google");
  });
</script>
