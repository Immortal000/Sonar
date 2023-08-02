/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      boxShadow: {
        "profile-card": "0 2px 4px rgba(0, 0, 0, 0.25)"
      }
    },
  },
  plugins: [],
};
