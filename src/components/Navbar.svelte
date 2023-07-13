<script>
  import "../styles/app.css";
  import { auth, db, provider } from "../firebase";
  import { authStore, authHandler } from "../store/store.js";

  const loginWithGoogle = async () => {
    authHandler.signup();
  };

  const signOutWithGoogle = async () => {
    authHandler.logout(auth);
  };
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
      <li>
        <form action="/" method="POST" autocomplete="on"  class="flex justify-between h-full w-full px-2 border border-gray-500 rounded focus-within:outline">
          <input type="text" name="search" placeholder="Search" class="h-full focus:outline-none">
          <button>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </li>
    </ul>
  </div>
  {#if $authStore.user}
    <button on:click={signOutWithGoogle}>
      <a class="inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" href="/"
        >Sign Out
      </a>
    </button>
  {:else}
    <button on:click={loginWithGoogle}>
      <a class="inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" href="/"
        >Login
      </a>
    </button>
  {/if}
</nav>
