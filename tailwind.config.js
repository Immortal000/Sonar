/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#457B9D',
        'light-primary': '#d9e3e9',
        'light-text' : '#0E0B07',
        'white-primary': '#F9F7F3',
        'light-bg' : '#F9F7F3',
        'filler' : '#7e7e7e',
        'light-accent' : '#3f5274',
        'light-light-accent' : '#c1cacc',
      }
    },
  },
  plugins: [],
};
