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
