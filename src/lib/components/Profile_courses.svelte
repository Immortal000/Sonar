<script>
    export let userName;
    export let userCourses
</script>

<div class="flex flex-col ">
    <h1>{userName} Course's</h1>
    {#each userCourses as course}
        <span>{course}</span>
    {/each}
</div>
