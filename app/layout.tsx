import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nikithad.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nikitha D — Full-Stack Developer · Machine Learning",
    template: "%s · Nikitha D",
  },
  description:
    "Portfolio of Nikitha D — a final-year Computer Science engineering student in Bangalore building full-stack web applications and machine learning systems, with published applied-ML research.",
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
    title: "Nikitha D — Full-Stack Developer · Machine Learning",
    description:
      "Final-year CS engineer building full-stack web applications and machine learning systems, with published applied-ML research.",
    siteName: "Nikitha D",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikitha D — Full-Stack Developer · Machine Learning",
    description:
      "Final-year CS engineer building full-stack web applications and machine learning systems, with published applied-ML research.",
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
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body className="bg-base text-cream antialiased">
        <Providers>
          {/* Decorative grain texture sits above content but never blocks it */}
          <div className="grain-overlay" aria-hidden="true" />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
