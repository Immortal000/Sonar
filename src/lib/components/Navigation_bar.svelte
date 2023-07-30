<script>
  import "../../styles/app.css";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { signOut } from "@auth/sveltekit/client";
  import { onMount } from "svelte";

  const loginWithGoogle = async () => {
    goto("/login");
  };

  let pop_down_triggered = false;
</script>

<nav class="flex justify-between w-10/12 m-auto py-5">
  <div class="w-max">
    <ul class="flex">
      <li class="mr-3">
        <a
          class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
          href="/">Home</a
        >
      </li>
      <li class="mr-3">
        <a
          class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
          href="/">About Us</a
        >
      </li>
      <li class="mr-3">
        <a
          class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
          href="/">Contact</a
        >
      </li>
      <li class="mr-3">
        <a href="/createPost" class="inline-block bg-blue-500 hover:bg-blue-800 rounded px-4 py-2 text-white">
          <i class="fa-solid fa-plus text-white pr-1" />Post
        </a>
      </li>
      <li class="mr-3">
        <form
          action="/"
          method="POST"
          autocomplete="on"
          class="flex justify-between h-full w-full px-2 border border-gray-500 rounded focus-within:outline"
        >
          <input type="text" name="search" placeholder="Search" class="h-full focus:outline-none" />
          <button>
            <i class="fa-solid fa-magnifying-glass" />
          </button>
        </form>
      </li>
    </ul>
  </div>
  {#if $page.data.session}
    <div>
      <div>
        <button
          class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0"
          on:click={() => (pop_down_triggered = !pop_down_triggered)}
        >
          <img src={$page.data.session.user.picture} alt="profile pic" class="w-10 h-10 rounded-full" />
        </button>
      </div>
      <div
        class:hidden={pop_down_triggered === false}
        class="z-10 bg-white absolute left-50 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{$page.data.session.user.name}</div>
          <div class="font-medium truncate">{$page.data.session.user.email}</div>
        </div>
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <a href="/profile" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Profile</a
            >
          </li>
        </ul>
        <div class="py-2">
          <button
            on:click={signOut}
            class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  {:else}
    <button
      on:click={loginWithGoogle}
      class="inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white"
      >Sign In</button
    >
  {/if}
</nav>
