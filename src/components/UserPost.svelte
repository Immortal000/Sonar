<script>
  // import x from ...
  export let postTitle = "";
  export let course = "";
  export let userName = "";
  export let postMessage = "";
</script>

<div class="flex flex-col px-5 py-3 rounded border border-gray-500 w-3/5">
  <div>
    {postTitle ? postTitle : "Post Title"} | {course ? course : "Course"} posted by {userName ? userName : "user"}
  </div>
  <div>
    Most Popular Message: <br />
    <span>
      {postMessage ? postMessage : "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"}
    </span>
  </div>
  <div>
    <i class="fa-regular fa-thumbs-up w-5 h-5" />
    <i class="fa-regular fa-bookmark w-5 h-5" />
    <i class="fa-solid fa-reply w-5 h-5" />
  </div>
</div>
