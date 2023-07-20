import { authStore, errorStore, postsHandler, postsStore } from "../../store/store";
import { doc, setDoc, addDoc, collection, getDoc, query, orderBy, limit } from "firebase/firestore";
import { db, provider } from "../../firebase";

import Post from "./post";

export const updatePosts = async () => {
  let pageNumber, displayPosts, allPosts;
  postsStore.subscribe((value) => {
    pageNumber = value.pageNumber;
    displayPosts = value.displayPosts;
    allPosts = value.allPosts;
  });

  postsStore.update((current) => {
    return {
      ...current,
      displayPosts: [...displayPosts, ...allPosts.slice(pageNumber * 5, pageNumber * 5 + 5)],
      pageNumber: pageNumber + 1,
    };
  });

  await getAllPosts();

  //   postsStore.subscribe((value) => {
  //     displayPosts = value.displayPosts;
  //   });

  //   console.log(displayPosts);
};

export const getSpecificPost = async (post_id) => {
  const postRef = doc(db, "posts", post_id);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    const post_data = postSnap.data();
    return post_data;
  }
};

export const getAllPosts = async () => {
  let pageNumber, displayPosts, allPosts, postsInfo;
  postsStore.subscribe((value) => {
    pageNumber = value.pageNumber - 1;
    displayPosts = value.displayPosts;
    allPosts = value.allPosts;
    postsInfo = value.postsInfo;
  });

  for (let post of displayPosts.slice(pageNumber * 5, pageNumber * 5 + 5)) {
    const post_data = await getSpecificPost(post);
    postsInfo.push(post_data);
  }

  postsStore.update((current) => {
    return {
      ...current,
      postsInfo: postsInfo,
    };
  });

  console.log(postsInfo);
};

// create the json and add the data to firebase
export const createPost = async (post_title, post_description, type = "main") => {
  let user;
  authStore.subscribe((value) => {
    user = value.user;
  });
  if (user) {
    // make the request if a user is present. Logged in.
    const postClass = new Post(post_title, post_description, type);
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
