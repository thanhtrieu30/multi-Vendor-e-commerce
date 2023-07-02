/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        "400px": "400px",
        "800px": "800px",
        "1000px": "1050px",
        "1100px": "1100px",
        "1300px": "1300px",
      },
    },
  },
  plugins: [],
};
