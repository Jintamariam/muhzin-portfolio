# Muhzin Mohammed — Portfolio

Next.js site with autoplaying video throughout: the hero video plays on load
(no click), and every project tile in the grid autoplays as it scrolls into
view, pausing when it scrolls out.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Right now the video/image `src` paths point at
files that don't exist yet (`/public/videos/...`, `/public/images/...`) —
the site will still render, just without footage, until you add real files
following the steps below.

## 2. Deploy it

Push this folder to a GitHub repo, then import it at vercel.com → New
Project. Vercel auto-detects Next.js, no config needed. Free tier is enough
for a portfolio site.

## 3. Getting Google Flow footage into the site (the actual workaround)

Google Flow (built on Veo) generates short clips — each generation is capped
at a few seconds, so there are three real constraints to work around before
footage is usable as an autoplaying web hero/background video:

**Constraint 1 — clip length.**
Flow won't generate a full 15–20 second continuous reel in one pass. Workaround:
generate several clips from the prompt library (see the earlier spec message,
section 14) that share a consistent mood/lighting direction, then concatenate
them with `ffmpeg` instead of relying on one long generation:

```bash
# concat.txt lists each clip on its own line: file 'clip1.mp4'
ffmpeg -f concat -safe 0 -i concat.txt -c copy stitched-reel.mp4
```

If clips have mismatched codecs/resolutions, re-encode first so `-c copy`
doesn't fail:

```bash
ffmpeg -i clip1.mp4 -c:v libx264 -crf 18 -pix_fmt yuv420p clip1-fixed.mp4
```

**Constraint 2 — color/grain consistency across generations.**
Different Flow generations can drift in color temperature even with similar
prompts. Workaround: apply one unifying grade pass over the stitched reel
(a simple LUT or `ffmpeg` eq/curves filter) so it reads as one continuous
piece of footage rather than visibly separate clips:

```bash
ffmpeg -i stitched-reel.mp4 -vf "eq=contrast=1.05:saturation=1.1:gamma=0.96" graded-reel.mp4
```

**Constraint 3 — file size and browser autoplay compatibility.**
Raw exported clips are often too heavy to autoplay smoothly, and browsers
(especially iOS Safari) are strict about what they'll autoplay at all.
Autoplay only works reliably when the video is **muted**, has
**`playsinline`**, and is a reasonably compressed **H.264 MP4**. Compress
and export dual formats:

```bash
# MP4 (H.264) — universal fallback, required for iOS/Safari autoplay
ffmpeg -i graded-reel.mp4 -vcodec libx264 -crf 23 -preset slow \
  -movflags +faststart -an showreel.mp4

# WebM (VP9) — smaller file, used first where supported (Chrome/Firefox/Edge)
ffmpeg -i graded-reel.mp4 -c:v libvp9 -crf 32 -b:v 0 -an showreel.webm
```

`-an` strips audio — hero/background videos should be silent by default
anyway (autoplay-with-sound is blocked by every major browser and would be a
bad experience regardless).

Aim for under ~6–8MB for a 15–20 second hero loop, and under ~2–3MB for each
grid-tile preview clip (those are shorter, ~5–8s loops).

**Where the files go:**

```
public/videos/showreel.mp4       ← hero video (home page)
public/videos/showreel.webm
public/videos/night-runner.mp4   ← per-project tile + case-study hero
public/videos/night-runner.webm
public/videos/quiet-hours.mp4
public/videos/quiet-hours.webm
public/videos/aftertaste.mp4
public/videos/aftertaste.webm

public/images/hero-poster.jpg    ← first-frame still, shown before video loads
public/images/night-runner-poster.jpg
public/images/quiet-hours-poster.jpg
public/images/aftertaste-poster.jpg
public/images/portrait.jpg
```

The `<video poster="...">` attribute is what makes the page feel instant —
the poster (a still frame, ideally the same first frame as the video) shows
immediately while the actual video file is still downloading, so there's
never a blank flash.

## 3b. The gallery (filterable stills + video)

Each project case study now has a **Gallery** section below the synopsis —
filter tabs (All / Highlights / Still Frames / Behind the Scenes) and a
grid of thumbnails that open into a fullscreen lightbox with arrow/dot
navigation (same pattern as the reference site you shared).

**Gallery items can be images or video** — this is also how you "embed
video into the banner": add a gallery item with `type: "video"` and it
opens full-size in the lightbox with sound and playback controls, the same
way a featured banner slide would. The full-bleed autoplay hero at the top
of the page is separate and always silent/looping by design — the gallery
lightbox is the place for video the visitor deliberately plays with sound.

Add gallery items in `lib/data/projects.js` under each project's `gallery`
array:

```js
gallery: [
  { type: "image", category: "highlights", src: "/images/x.jpg", thumb: "/images/x.jpg" },
  { type: "video", category: "highlights", src: "/videos/x-clip.mp4", poster: "/images/x-clip-poster.jpg", thumb: "/images/x-clip-poster.jpg" },
]
```

`category` must be one of: `highlights`, `stills`, `bts`. For video items,
always provide a `poster`/`thumb` still frame — the grid renders that still,
and only loads the actual video file once the visitor clicks to open it, so
the gallery page stays fast even with several video clips in it.

## 4. Adding/editing projects

Everything project-related lives in **`lib/data/projects.js`** — add a new
object to the array and it automatically appears on the homepage reel,
`/portfolio`, and gets its own `/portfolio/[slug]` page. No other file needs
to change. Drop the new video/poster files in `public/videos` and
`public/images` first, then copy this into the `projects` array:

```js
{
  slug: "new-project-slug",       // used in the URL: /portfolio/new-project-slug
  title: "Project Title",
  category: "Commercial",          // or "Narrative", "Music Video", etc.
  year: 2026,
  role: "Director of Photography",
  logline: "One sentence describing the project.",
  specs: { camera: "", lens: "", fps: 24, aperture: "" }, // leave blank strings for unknown specs
  poster: "/images/new-project-poster.jpg",
  video: [
    { src: "/videos/new-project.webm", type: "video/webm" }, // optional but smaller/faster
    { src: "/videos/new-project.mp4", type: "video/mp4" },
  ],
  gallery: [],                     // optional — see section 3b for the format
  credits: {                       // any role can be left as "" and it just won't show on the page
    director: "",
    producer: "",
    gaffer: "",
    colourist: "",
    editor: "",
  },
},
```

Only `slug`, `title`, `category`, `year`, `logline`, and `video` are required
for the project to render correctly — everything else degrades gracefully
when left blank or omitted.

## 5. Homepage sections beyond the reel

Three extra homepage sections exist as ready-but-empty components — each one
renders nothing at all until you add data, so there's no "coming soon" gap:

- **Cinematography montage** (`lib/data/montage.js`) — a horizontal reel of
  short, unlabeled clips ("this is what I can do with a camera"), separate
  from named projects.
- **Behind the Frame** (`lib/data/bts.js`) — BTS still paired with the final
  frame it produced.
- **Shot on Camera** (`lib/data/shots.js`) — a raw grid of very short clips,
  numbered rather than titled.

Each file has the exact object shape documented in a comment at the top —
add an item to the array and the corresponding section appears on the
homepage automatically.

**Categories on `/portfolio`** are also fully automatic: the filter pills
are derived from whatever `category` values exist in `lib/data/projects.js`
(currently Commercial/Narrative/Music Video from the placeholder data). Add
a project with `category: "Wedding"` or `category: "Sports"` and that pill
appears with no code changes.

## 6. Things to fill in before this goes live

- [ ] Real Instagram/Vimeo/LinkedIn URLs, if wanted (deliberately omitted
      for now rather than linking to placeholder pages)
- [ ] Actual project video/poster files per the paths above
- [ ] Portrait photo for `/about`
- [ ] Real crew credit names in `lib/data/projects.js`
- [ ] Confirm the Gear list in `app/about/page.js` reflects what he actually shoots on
- [ ] Real project data to replace the three placeholder projects (Night
      Runner / Quiet Hours / Aftertaste) — including at least one Wedding
      and one Sports project so those categories/sections have real content
- [ ] `metadataBase` URL in `app/layout.js` once you have a real domain
