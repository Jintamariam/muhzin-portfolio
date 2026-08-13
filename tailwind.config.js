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
        signal: "#4F8A82",     // desaturated viewfinder-teal — primary accent (links, status, focus)
        ember: "#C9824D",      // warm tungsten-copper — secondary accent (highlights, cursor tally, glow)
      },
      fontFamily: {
        // One typeface (Montserrat) across the whole site — display, body,
        // and the mono/HUD-label text all resolve to the same font family
        // now, distinguished by weight/size/tracking instead of a font
        // change, so the site reads as one bold voice rather than mixed.
        display: ["var(--font-sans)", "sans-serif"],
        body: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};
