<script>
    import { onDestroy, onMount } from "svelte";
    import Tiptap from "../../components/Tiptap.svelte";
    import { createPost } from "../../schemas/postFunctions";
    import { authStore, errorStore } from "../../store/store.js";
    import {
        doc,
        getDoc,
        setDoc,
        addDoc,
        collection,
    } from "firebase/firestore";
    import { db } from "../../firebase";

    // app variables
    let post_title = "";
    let post_description = "";
    let courses = [];
    let courseSelected = "";

    onMount(async () => {
        const docRef = doc(db, "universities", "tamu");
        await getDoc(docRef).then((res) => {
            if (res.exists()) {
                courses = Object.keys(res.data().courses) || [];
            } else {
                console.log("No Courses Loaded");
            }
        });
    });

    //Post Function
    // const createPost = async () => {
    //     if ($authStore.user) {
    //         // make the request if a user is present. Logged in.
    //         post_description = postDescriptionStore;
    //         const postClass = new Post(post_title, post_description, "main");
    //         postClass.createPost();
    //     } else {
    //         errorStore.update((current) => {
    //             return {
    //                 error: true,
    //                 error_type: "auth",
    //             };
    //         });
    //     }
    // };

    const testing = () => {
        console.log("Finished");
        console.log(post_description);
    };
</script>

<div class="w-3/5">
    <form
        on:submit={() => {
            console.log(post_description);
            createPost(post_title, post_description);
        }}
        class="w-full p-4 flex flex-col relative z-30 gap-2"
    >
        <select
            name="courses"
            id=""
            bind:value={courseSelected}
            required
            class="w-1/5 text-black border rounded border-gray-500"
        >
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
        <Tiptap bind:text={post_description} />
        <button type="submit" class="sub_btn rounded bg-blue-500 px-2 py-2"
            >Submit</button
        >
    </form>
</div>
