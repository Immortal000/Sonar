import { Prisma } from "@prisma/client";
import { page } from "$app/stores";
import { auth } from "../firebase.js";

export const addReplyToPost = async (post_id, reply_content) => {
  const reply_thing = await fetch("/api/replies", {
    method: "POST",
    body: JSON.stringify({
      post_id: post_id,
      content: reply_content,
      user_id: auth.currentUser.uid,
    }),
  });

  console.log("Done");
};

export const addPostToPosts = async (post_title, post_content) => {
  let university, course;
  page.subscribe((value) => {
    university = value.params.universityName;
    course = value.params.universityCourse;
  });
  // university exists
  const post_thing = await fetch("/api/posts", {
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

  console.log(new_post.id);
};

export const check_validity = async (university) => {
  const university_exists = Prisma.$exists.university({ name: university });

  return university_exists;
};
