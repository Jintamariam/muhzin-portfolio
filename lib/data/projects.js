// Central project data. Add a new project by adding an object here —
// no other file needs to change for it to appear on /portfolio.
export const projects = [
  {
    slug: "night-runner",
    title: "Night Runner",
    category: "Commercial",
    year: 2026,
    role: "Director of Photography",
    logline:
      "A high-energy automotive spot shot entirely at night, built around practical neon and anamorphic flare.",
    specs: { camera: "ARRI Alexa Mini", lens: "Cooke Anamorphic/i 40mm", fps: 24, aperture: "T2.0" },
    poster: "/images/night-runner-poster.jpg",
    video: [
      { src: "/videos/night-runner.webm", type: "video/webm" },
      { src: "/videos/night-runner.mp4", type: "video/mp4" },
    ],
    // Gallery mixes stills and video clips. type: "video" items should have
    // both `poster`/`thumb` (a still frame, used in the grid) and `src`
    // (the actual clip, only loaded when opened in the lightbox).
    gallery: [
      { type: "image", category: "highlights", src: "/images/night-runner-highlight-1.jpg", thumb: "/images/night-runner-highlight-1.jpg", alt: "Night Runner highlight still" },
      { type: "video", category: "highlights", src: "/videos/night-runner-clip-1.mp4", poster: "/images/night-runner-clip-1-poster.jpg", thumb: "/images/night-runner-clip-1-poster.jpg", alt: "Night Runner highlight clip" },
      { type: "image", category: "stills", src: "/images/night-runner-still-1.jpg", thumb: "/images/night-runner-still-1.jpg", alt: "Night Runner still frame" },
      { type: "image", category: "stills", src: "/images/night-runner-still-2.jpg", thumb: "/images/night-runner-still-2.jpg", alt: "Night Runner still frame" },
      { type: "image", category: "bts", src: "/images/night-runner-bts-1.jpg", thumb: "/images/night-runner-bts-1.jpg", alt: "Night Runner behind the scenes" },
      { type: "image", category: "bts", src: "/images/night-runner-bts-2.jpg", thumb: "/images/night-runner-bts-2.jpg", alt: "Night Runner behind the scenes" },
    ],
    credits: {
      director: "Add director name",
      producer: "Add producer name",
      gaffer: "Add gaffer name",
      colourist: "Add colourist name",
      editor: "Add editor name",
    },
  },
  {
    slug: "quiet-hours",
    title: "Quiet Hours",
    category: "Narrative",
    year: 2025,
    role: "Director of Photography",
    logline:
      "A short drama about a family navigating a single difficult evening, shot handheld with natural light.",
    specs: { camera: "Sony FX6", lens: "Zeiss Supreme Primes", fps: 24, aperture: "T1.8" },
    poster: "/images/quiet-hours-poster.jpg",
    video: [
      { src: "/videos/quiet-hours.webm", type: "video/webm" },
      { src: "/videos/quiet-hours.mp4", type: "video/mp4" },
    ],
    credits: {
      director: "Add director name",
      producer: "Add producer name",
      gaffer: "Add gaffer name",
      colourist: "Add colourist name",
      editor: "Add editor name",
    },
  },
  {
    slug: "aftertaste",
    title: "Aftertaste",
    category: "Music Video",
    year: 2025,
    role: "Director of Photography",
    logline:
      "A music video built around slow push-ins and saturated practical lighting, shot on 35mm-style anamorphic.",
    specs: { camera: "RED Komodo", lens: "Sirui Anamorphic 50mm", fps: 24, aperture: "T2.8" },
    poster: "/images/aftertaste-poster.jpg",
    video: [
      { src: "/videos/aftertaste.webm", type: "video/webm" },
      { src: "/videos/aftertaste.mp4", type: "video/mp4" },
    ],
    credits: {
      director: "Add director name",
      producer: "Add producer name",
      gaffer: "Add gaffer name",
      colourist: "Add colourist name",
      editor: "Add editor name",
    },
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
