// Central project data. Add a new project by adding an object here —
// no other file needs to change for it to appear on /portfolio.
export const projects = [
  {
    slug: "nocturne",
    title: "Nocturne",
    category: "Commercial",
    year: 2026,
    role: "Director of Photography",
    logline:
      "A high-energy automotive spot shot entirely at night, built around practical neon and anamorphic flare.",
    specs: { camera: "ARRI Alexa Mini", lens: "Cooke Anamorphic/i 40mm", fps: 24, aperture: "T2.0" },
    poster: "/images/nocturne-poster.jpg",
    video: [
      { src: "/videos/nocturne.webm", type: "video/webm" },
      { src: "/videos/nocturne.mp4", type: "video/mp4" },
    ],
    // Gallery mixes stills and video clips. type: "video" items should have
    // both `poster`/`thumb` (a still frame, used in the grid) and `src`
    // (the actual clip, only loaded when opened in the lightbox).
    gallery: [
      { type: "image", category: "highlights", src: "/images/nocturne-highlight-1.jpg", thumb: "/images/nocturne-highlight-1.jpg", alt: "Nocturne highlight still" },
      { type: "video", category: "highlights", src: "/videos/nocturne-clip-1.mp4", poster: "/images/nocturne-clip-1-poster.jpg", thumb: "/images/nocturne-clip-1-poster.jpg", alt: "Nocturne highlight clip" },
      { type: "image", category: "stills", src: "/images/nocturne-still-1.jpg", thumb: "/images/nocturne-still-1.jpg", alt: "Nocturne still frame" },
      { type: "image", category: "stills", src: "/images/nocturne-still-2.jpg", thumb: "/images/nocturne-still-2.jpg", alt: "Nocturne still frame" },
      { type: "image", category: "bts", src: "/images/nocturne-bts-1.jpg", thumb: "/images/nocturne-bts-1.jpg", alt: "Nocturne behind the scenes" },
      { type: "image", category: "bts", src: "/images/nocturne-bts-2.jpg", thumb: "/images/nocturne-bts-2.jpg", alt: "Nocturne behind the scenes" },
    ],
    credits: {
      director: "",
      producer: "",
      gaffer: "",
      colourist: "",
      editor: "",
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
      director: "",
      producer: "",
      gaffer: "",
      colourist: "",
      editor: "",
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
      director: "",
      producer: "",
      gaffer: "",
      colourist: "",
      editor: "",
    },
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
