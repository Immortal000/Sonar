<script>
    import { authStore, errorStore } from "../../store/store.js";

    // app variables
    let post_title = "";
    let post_description = "";
    let modal = false;
    let courses = ["Csc121"]
    let courseSelected = "";

    //Post Function
    const createPost = async () => {
        if ($authStore.user) {
            // make the request if a user is present. Logged in.
            const postClass = new Post(post_title, post_description, "main");
            postClass.createPost();
        } else {
            errorStore.update((current) => {
                return {
                    error: true,
                    error_type: "auth",
                };
            });
        }
    };
</script>

<div class="w-3/5">
    <form
        action={createPost}
        class="w-full p-4 flex flex-col relative z-30 gap-2"
    >
        <select name="courses" id="" bind:value={courseSelected} required  class="w-1/5 text-black border rounded border-gray-500">
            <option value="" disabled selected>Select a Course</option>
            {#each courses as course}
                <option value={course} class="uppercase">{course}</option>
            {/each}
        </select>
        <label for="">Title</label>
        <input
            type="text"
            bind:value={post_title}
            class="border border-black rounded px-1"
            required
        />
        <label for="">Description</label>
        <input
            type="text"
            bind:value={post_description}
            class="border border-black rounded min-h-full"
            required
        />
        <button type="submit" class="rounded bg-blue-500 px-2 py-2"
            >Submit</button
        >
    </form>
</div>
