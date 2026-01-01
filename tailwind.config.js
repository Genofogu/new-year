/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hkPink: "#ffb7d5",
        hkRed: "#ff0044",
        bpBlack: "#121212",
        bpPink: "#f8a5c2",
      },
    },
  },
  plugins: [],
}