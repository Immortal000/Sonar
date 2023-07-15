import postSchema from "./post.json";
import { page } from "$app/stores";
import { authStore } from "../store/store.js";
import { auth, db } from "../firebase.js";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore";

export default class Post {
  constructor(post_title, post_content, type) {
    this.post_title = post_title;
    this.post_content = post_content;
    this.type = type;
    this.validPost = false;

    page.subscribe((value) => {
      this.university = value.params.universityName;
      this.course = value.params.universityCourse;
    });

    this.user_id = auth.currentUser.uid;
    this.user_name = auth.currentUser.displayName;

    // post json schema
    this.postSchema = { ...postSchema };
  }

  async checkValidity() {
    this.uniRef = doc(db, "universities", this.university);
    this.uniSnap = await getDoc(this.uniRef);

    if (this.uniSnap.exists()) {
      this.university_data = this.uniSnap.data();
      if (this.course in this.university_data.courses) {
        this.validPost = true; // post can be added
      }
    }
  }

  async createPost() {
    await this.checkValidity();
    // console.log(this.validPost);
    if (this.validPost) {
      this.postSchema["post"]["post_title"] = this.post_title; // post title
      this.postSchema["post"]["post_content"] = this.post_content; // post description
      this.postSchema["post"]["meta_data"]["type"] = this.type;
      this.postSchema["date_created"] = new Date(); // time stamp when the request was made
      this.postSchema["university"]["university_id"] = this.university; // University id, ex.tamu
      this.postSchema["university"]["course_id"] = this.course; // course id, ex.csce120
      this.postSchema["user"]["user_name"] = this.user_id; // user name
      this.postSchema["user"]["user_id"] = this.user_name; // user id

      await this.addPostToPosts();
      await this.addPostToUniversity();
      await this.addPostToUser();
    }
  }

  async addPostToPosts() {
    try {
      this.postRef = await addDoc(collection(db, "posts"), this.postSchema);
    } catch (error) {
      console.log("Couldnt add post to the post database");
    }
  }

  async addPostToUniversity() {
    let new_posts_data = [this.postRef.id, ...this.university_data["courses"][this.course].posts];
    // console.log(this.university_data);
    this.university_data["courses"][this.course].posts = new_posts_data;
    await setDoc(doc(db, "universities", this.university), this.university_data);
  }
  async addPostToUser() {
    this.userRef = doc(db, "users", this.user_id);
    this.userSnap = await getDoc(this.userRef);
    let userData = this.userSnap.data();
    userData.posts.push(this.postRef.id);

    await setDoc(doc(db, "users", this.user_id), userData);
  }
}
