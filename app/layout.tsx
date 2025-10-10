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
  title: "Retyped - Discover Your Next Favorite Podcast",
  description: "Discover, listen, and connect with the stories that matter. Explore the world's best podcasts.",
  openGraph: {
    title: "Retyped - Discover Your Next Favorite Podcast",
    description: "Discover, listen, and connect with the stories that matter. Explore the world's best podcasts.",
    type: "website",
    siteName: "Retyped",
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
      <head>
        <AdSense />
      </head>
      <body
        className={`${inter.variable} ${openSans.variable} antialiased`}
      >
        <StoreProvider>
          <AuthProvider>
            <Navbar />
            <main className="pt-12 md:pt-14 pb-28">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </StoreProvider>
      </body>
      <Analytics />
    </html>
  );
}
