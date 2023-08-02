// THIS IS THE STORE - GLOBAL VARIABLES ARE STORED HERE
import { writable } from "svelte/store";

export const university_list = writable(["tamu"]);
export const course_list = writable(["tamu"]);

export const user_course_list = writable([]);
