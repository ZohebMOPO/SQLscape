/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#FFE81F",
        primary: "#000000",
      },
      screens: {
        sm: "450px",

        md: "768px",

        lg: "1350px",
      },
    },
  },
  plugins: [],
};
