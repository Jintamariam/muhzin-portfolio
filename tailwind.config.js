/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0C0C",        // near-black background
        ink2: "#141616",       // secondary panel background
        bone: "#EDEAE2",       // off-white text
        dim: "#8B8A82",        // secondary text
        hairline: "#2B2C2B",   // borders
        signal: "#4F8A82",     // desaturated viewfinder-teal accent (used sparingly)
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};
