/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: false, // or 'media' or 'class'
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        money: "rgb(241,125,73)",
        primary: "#598fe8",
      },
    },
  },
  plugins: [],
};
