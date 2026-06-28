import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
// Footer is set aside while the landing page is just navbar + hero + placeholders.
// import Footer from "@/components/Footer";

// Body / UI
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Code / terminal elements
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// Display / accent
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nikithad.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nikitha D — Full-Stack Developer · ML · Maker",
    template: "%s · Nikitha D",
  },
  description:
    "Portfolio of Nikitha D — a second-year CS engineer in Bangalore who builds full-stack systems, trains ML models, designs dresses, and solders jewellery.",
  keywords: [
    "Nikitha D",
    "portfolio",
    "full-stack developer",
    "machine learning",
    "Spring Boot",
    "React",
    "Bangalore",
    "software engineer",
  ],
  authors: [{ name: "Nikitha D" }],
  creator: "Nikitha D",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Nikitha D — Full-Stack Developer · ML · Maker",
    description:
      "Full-stack systems, ML models, dresses, and jewellery. Built by someone who debugs at 2am.",
    siteName: "Nikitha D",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikitha D — Full-Stack Developer · ML · Maker",
    description:
      "Full-stack systems, ML models, dresses, and jewellery. Built by someone who debugs at 2am.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-base text-cream antialiased">
        <Providers>
          {/* Decorative texture + custom cursor sit above content but never block it */}
          <div className="grain-overlay" aria-hidden="true" />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
