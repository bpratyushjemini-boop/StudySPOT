import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudySpot — Find your space. Focus on what matters.",
  description:
    "Apple-inspired mobile study space discovery platform for college students. Check seat availability, explore campus libraries, choose your desk, and get walking directions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#EFEFEA] antialiased">
      <body className="min-h-full flex flex-col font-sans bg-[#EFEFEA]">
        {children}
      </body>
    </html>
  );
}
