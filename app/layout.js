import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://muhzinmohammed.com"),
  title: {
    default: "Muhzin Mohammed | Cinematographer",
    template: "Muhzin Mohammed | %s",
  },
  description:
    "Muhzin Mohammed is a cinematographer working across commercial, narrative, and music video projects.",
  openGraph: {
    title: "Muhzin Mohammed | Cinematographer",
    description:
      "Muhzin Mohammed is a cinematographer working across commercial, narrative, and music video projects.",
    siteName: "Muhzin Mohammed",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-ink text-bone antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
