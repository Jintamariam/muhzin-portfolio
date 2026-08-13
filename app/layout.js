import { Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

// Single Montserrat instance covers display, body, and mono/HUD-label text —
// the whole site reads as one bold, confident typeface rather than the
// previous serif-display + mono-label mix.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://muhzinmohammed.com"),
  title: {
    default: "Muhzin Mohammed | Cinematographer",
    template: "Muhzin Mohammed | %s",
  },
  description:
    "Muhzin Mohammed is a cinematographer working across commercials, weddings, sports, narrative, and music video projects.",
  openGraph: {
    title: "Muhzin Mohammed | Cinematographer",
    description:
      "Muhzin Mohammed is a cinematographer working across commercials, weddings, sports, narrative, and music video projects.",
    siteName: "Muhzin Mohammed",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-body bg-ink text-bone antialiased">
        <div className="ambient-glow" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
        {/* Bold blue rails on either edge — persist through scroll (fixed),
            a simple standard-blue accent against the site's teal/copper
            palette, framing the page like film-strip edge markings. */}
        <div className="pointer-events-none fixed left-0 top-0 z-40 h-full w-1 bg-blue-600" aria-hidden="true" />
        <div className="pointer-events-none fixed right-0 top-0 z-40 h-full w-1 bg-blue-600" aria-hidden="true" />
        <Cursor />
        <Nav />
        <main id="main" className="relative z-[1]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
