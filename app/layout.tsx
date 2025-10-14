import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import "@/app/_lib/fontawesome";
import Navbar from "@/app/_components/layout/Navbar";
import Footer from "@/app/_components/layout/Footer";
import StoreProvider from "@/app/_providers/StoreProvider";
import AuthProvider from '@/app/_providers/AuthProvider';
import Analytics from "@/app/_components/layout/Analytics";
import AdSense from "@/app/_components/layout/AdSense";
import GlobalAudioPlayer from "@/app/_components/audio/GlobalAudioPlayer";
import { LazyMotion, domMax } from "framer-motion";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://retyped.xyz'),
  title: "Retyped - Discover Your Next Favorite Podcast",
  description: "Discover, listen, and connect with the stories that matter. Explore the world's best podcasts.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Retyped - Discover Your Next Favorite Podcast",
    description: "Discover, listen, and connect with the stories that matter. Explore the world's best podcasts.",
    type: "website",
    siteName: "Retyped",
    url: "https://retyped.xyz",
    locale: "en_US",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Retyped - Discover Your Next Favorite Podcast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retyped - Discover Your Next Favorite Podcast",
    description: "Discover, listen, and connect with the stories that matter. Explore the world's best podcasts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${openSans.variable} antialiased`}
      >
        <LazyMotion features={domMax} strict>
          <StoreProvider>
            <AuthProvider>
              <Navbar />
              <main className="pt-12 md:pt-14 pb-28">
                {children}
              </main>
              <Footer />
              <GlobalAudioPlayer />
            </AuthProvider>
          </StoreProvider>
        </LazyMotion>
      </body>
      <AdSense />
      <Analytics />
    </html>
  );
}
