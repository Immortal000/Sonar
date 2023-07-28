import { Prisma } from "@prisma/client";
import { page } from "$app/stores";
import { auth } from "../firebase.js";
import { get } from "svelte/store";

/**
 * Adds a reply to the specific post
 * @param {String} post_id the ID of the post to reply to
 * @param {String} reply_content the message contained in the reply
 */
export const addReplyToPost = async (post_id, reply_content) => {
  const reply_thing = await fetch("/api/replies", {
    method: "POST",
    body: JSON.stringify({
      post_id: post_id,
      content: reply_content,
      user_id: auth.currentUser.uid,
    }),
  });

  const data = await reply_thing.json();
  return data;
};

/**
 * Adds a specific post to the database based on the route's university name and the course name
 * @param {String} post_title the title of the post
 * @param {String} post_content the content of the post, there is currently no limit on the characters
 */
export const addPostToPosts = async (post_title, post_content) => {
  let university, course;
  const param_sub = page.subscribe((value) => {
    university = value.params.universityName;
    course = value.params.universityCourse;
  });

  param_sub(); // unsubscribe
  // university exists
  const post_thing = await fetch("/api_v2/posts/post", {
    method: "POST",
    body: JSON.stringify({
      university: university,
      course: course,
      user_id: auth.currentUser.uid,
      title: post_title,
      content: post_content,
    }),
  });

  const new_post = await post_thing.json();

  // console.log(new_post.id);
};

export const check_validity = async (university) => {
  const university_exists = Prisma.$exists.university({ name: university });

  return university_exists;
};
