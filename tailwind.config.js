/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,tsx}",
    require.resolve("react-widgets/styles.css"),
  ],
  theme: {
    extend: {
      screens: {
        sm: "700px",
      },
    },
  },
  plugins: [require("react-widgets-tailwind")],
};
