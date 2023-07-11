<script>
  import "../styles/app.css";
  //   import firebase from "firebase/app";

  //   const loginWithGoogle = async () => {
  //     try {
  //       const provider = new firebase.auth.GoogleAuthProvider();
  //       await firebase.auth().signInWithPopup(provider);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
</script>

<!-- <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6 w-full">
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <a href="">Home</a>
      <a href="">About Us</a>
      <a href="">Contact</a>
    </div>
    <div>
      <a
        href="#"
        class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        >Login</a
      >
    </div>
  </div>
</nav> -->
<nav class="flex justify-between w-10/12 m-auto py-5">
  <div>
    <ul class="flex justify-between">
      <li class="mr-3">
        <a
          class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
          href="#">Home</a
        >
      </li>
      <li class="mr-3">
        <a
          class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
          href="#">About Us</a
        >
      </li>
      <li class="mr-3">
        <a
          class="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
          href="#">Contact</a
        >
      </li>
    </ul>
  </div>
  <div>
    <a class="inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" href="#"
      >Login
    </a>
  </div>
</nav>
