<script>
  import { get, writable } from "svelte/store";

  export let data;

  $: user_information = data.user_data;

  const showModal = writable(false);
  const editProfile = () => {
    showModal.set($showModal ? false : true);
  };
</script>

<div class="flex">
  <div class="w-full max-w-[380px] h-full flex justify-center">
    <div
      class="mt-14 w-[272px] h-[420px] rounded-[25px] shadow-profile-card overflow-hidden flex flex-col items-center relative"
    >
      <img
        src="/sus.jpg"
        alt="banner pic"
        class="h-[140px] w-full bg-gray-400 absolute top-0 z-[-1]"
      />
      <img
        src={user_information.profile_image}
        alt="profile pic"
        class="w-[100px] h-[100px] rounded-[50%] mt-[90px] bg-gray-900"
      />
      <div class="w-full h-full p-4 flex flex-col">
        <div class="text-xl font-bold w-full flex justify-between items-center">
          {user_information.userName}
          <button on:click={editProfile} class="w-6 aspect-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
        <div class="h-1 rounded-sm w-full bg-black my-3" />
        {#if user_information.universityName !== null && user_information.universityName !== undefined}
          <div class="text-lg font-medium">
            {user_information.universityName}
          </div>
        {/if}
        {#if user_information.major !== null && user_information.major !== undefined}
          <div class="mt-3 text-lg font-medium">
            {user_information.major}
          </div>
        {/if}
        {#if user_information.minor !== null && user_information.minor !== undefined}
          <div class="text-sm text-gray-600 font-medium">
            {user_information.minor}
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div class="w-full h-full bg-gray-200">random ass text</div>
</div>

{#if $showModal}
  <form
    class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[288px] bg-gray-200 rounded-xl p-4"
  >
    <label>
      Name:
      <input type="text" />
    </label>
    <label>
      University:
      <select>
        <option value="ahhhh">ahhhh</option>
      </select>
    </label>
    <label>
      Major:
      <select>
        <option value="Computer Science">Computer Science</option>
      </select>
    </label>
    <label>
      Minor:
      <select>
        <option value="Computer Science">Computer Science</option>
      </select>
    </label>
  </form>
{/if}
