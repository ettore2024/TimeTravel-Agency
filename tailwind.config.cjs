/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#07080B",
        bone: "#F5F3EE",
        accent: "#43D7FF"
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "sans-serif"],
        body: ["\"Archivo\"", "sans-serif"]
      },
      letterSpacing: {
        tightest: "-0.04em"
      },
      boxShadow: {
        glow: "0 0 40px rgba(67, 215, 255, 0.25)",
        soft: "0 20px 60px rgba(7, 8, 11, 0.45)"
      }
    }
  },
  plugins: []
};
