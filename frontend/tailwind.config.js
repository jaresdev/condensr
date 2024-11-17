/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        onest: ["One Stroke", "sans-serif"],
      },
      colors: {
        primary: "#A8D5BA",
        secondary: "#ACAFB4",
        tertiary: "#6B8E75",
        accent: "#F7E8A4",
        textPrimary: "#0C1117",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        body: {
          color: theme("colors.textPrimary"),
        },
      });
    },
  ],
};
