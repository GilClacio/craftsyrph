import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CraftSyrph - Textile Crafts & Projects",
  description: "Showcasing beautiful textile crafts, ongoing projects, tutorials, and creative inspiration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-orange-50`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-amber-900 text-amber-50 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>&copy; 2025 CraftsyRPh. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
