<!-- src/routes/+layout.svelte -->
<script>
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import NavigationBar from "../lib/components/Navigation_bar.svelte";
</script>

<NavigationBar />
<slot />
