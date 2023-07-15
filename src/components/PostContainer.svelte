<script>
  export let post_title = "";
  export let post_content = "";
</script>

<div class="w-1/3 flex-column">
  <div>
    <input
      placeholder="Title"
      type="text"
      class="my-2 border border-blue-500 rounded-sm w-full py-2 px-2"
      bind:value={post_title}
    />
  </div>
  <div
    class="flex-column w-full mb-4 border border-blue-700 rounded-sm bg-blue-500 dark:bg-blue-500 dark:border-gray-600"
  >
    <div class="flex items-center space-x-1 sm:pr-4 px-3 py-2">
      <button>File</button>
      <button>Bold</button>
      <button>Italic</button>
      <button>Code</button>
    </div>
    <div>
      <textarea
        name="textarea-name"
        rows="5"
        placeholder="Text"
        bind:value={post_content}
        class="focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-full appearance-none border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
      />
    </div>
  </div>
  <div>
    <button class="bg-blue-500 border p-2 text-white rounded">Create Post</button>
  </div>
</div>
