<script>
    import { browser } from "$app/environment"
    import { goto } from "$app/navigation"
    import { page } from "$app/stores"
    import { auth } from "../../firebase.js";

    $: if(browser && !auth.currentUser) {
        console.log("KICKED GET OUT");
        goto("/");
    } else {
        console.log("ALLOWED IN");
    }
</script>

<slot/>