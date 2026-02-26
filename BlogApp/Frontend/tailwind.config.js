export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00d4ff",
        "primary-dark": "#0099cc",
        "background-dark": "#0a0e27",
        "card-dark": "#1a1f3a",
        "surface-dark": "#141829",
        "border-dark": "#2d3447",
      },
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
console.log("TAILWIND CONFIG LOADED");

