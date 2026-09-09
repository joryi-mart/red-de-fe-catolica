import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://red-de-fe-catolica.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Red de Fe Católica | Evangelio del día, Lectura y Santoral",
    template: "%s | Red de Fe Católica",
  },
  description:
    "Evangelio del día, lectura católica, santoral y videos del canal de YouTube Red de Fe Católica. Reflexiones diarias para fortalecer tu fe.",
  openGraph: {
    title: "Red de Fe Católica",
    description:
      "Evangelio del día, lectura católica, santoral y videos del canal de YouTube Red de Fe Católica.",
    url: SITE_URL,
    siteName: "Red de Fe Católica",
    locale: "es",
    type: "website",
    images: ["/banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Red de Fe Católica",
    description:
      "Evangelio del día, lectura católica, santoral y videos del canal de YouTube Red de Fe Católica.",
    images: ["/banner.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
      </body>
    </html>
  );
}
