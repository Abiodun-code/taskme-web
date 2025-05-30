/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1192px',
    },
    extend: {},
    fontFamily: {
      league: ['League Spartan', 'sans-serif'],
      inter: ["Inter", "sans-serif"],
      quick: ["Quicksand", "sans-serif"]
    },
    backgroundImage: {},
  },
}